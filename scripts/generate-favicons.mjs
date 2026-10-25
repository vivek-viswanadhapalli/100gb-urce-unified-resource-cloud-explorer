/**
 * Generates crisp white-background PNG favicons (16x16, 32x32, 48x48, 180x180)
 * and a multi-resolution favicon.ico in /public using pure Node.js built-ins (zlib + fs).
 * No external native dependencies required — runs identically on Windows, macOS, and Linux.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// CRC32 table for valid PNG chunk encoding
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // filter none
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function distToSegment(px, py, ax, ay, bx, by) {
  const vx = bx - ax;
  const vy = by - ay;
  const wx = px - ax;
  const wy = py - ay;
  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return Math.hypot(px - ax, py - ay);
  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return Math.hypot(px - bx, py - by);
  const b = c1 / c2;
  return Math.hypot(px - (ax + b * vx), py - (ay + b * vy));
}

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/**
 * Evaluates normalized [0..64, 0..64] coordinates for the 100GB cloud-infinity mark
 * on a crisp white rounded-square background.
 */
function sampleIcon(nx, ny) {
  // Rounded square mask (center 32,32, half-size 31, radius 12)
  const qx = Math.abs(nx - 32) - (31 - 12);
  const qy = Math.abs(ny - 32) - (31 - 12);
  const roundedDist =
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - 12;

  if (roundedDist > 0) {
    return [255, 255, 255, 0];
  }

  // Subtle border on white tile
  let r = 255;
  let g = 255;
  let b = 255;
  if (roundedDist > -1.3) {
    r = 228;
    g = 231;
    b = 236;
  }

  // Color gradient from cobalt (#1152EE) on left to cyan (#1AD1EE) on right
  const tGrad = (nx - 8) / 48;
  const fgR = Math.round(lerp(17, 26, tGrad));
  const fgG = Math.round(lerp(82, 209, tGrad));
  const fgB = Math.round(lerp(238, 238, tGrad));

  // 1) Numeral '1' stem + angled flag
  const dStem = distToSegment(nx, ny, 14.5, 25.5, 14.5, 48.0) - 3.6;
  const dFlag = distToSegment(nx, ny, 8.2, 31.0, 14.2, 26.0) - 3.0;
  const dOne = Math.min(dStem, dFlag);

  // 2) Left '0' ring (center 29.5, 39.5, radius 8.5, thickness 3.3)
  const dLeftRing = Math.abs(Math.hypot(nx - 29.5, ny - 39.5) - 8.5) - 3.2;

  // 3) Right '0' ring (center 49.0, 39.5, radius 8.5, thickness 3.3)
  const dRightRing = Math.abs(Math.hypot(nx - 49.0, ny - 39.5) - 8.5) - 3.2;

  // 4) Diagonal infinity bridge connecting bottom-left to top-right smoothly
  const dBridge = distToSegment(nx, ny, 34.5, 45.2, 44.0, 33.8) - 3.2;

  // 5) Cloud upper dome arch above the '00'
  const distCloudOuter = Math.hypot(nx - 39.0, ny - 28.0) - 14.2;
  const distCloudInner = Math.hypot(nx - 38.2, ny - 31.2) - 11.4;
  const inCloudBand = Math.max(distCloudOuter, -distCloudInner, ny - 28.2);

  const shapeDist = Math.min(dOne, dLeftRing, dRightRing, dBridge, inCloudBand);

  if (shapeDist < 0) {
    // Deepen numeral '1' slightly for strong contrast at 16x16
    if (dOne <= shapeDist + 0.2) {
      return [18, 76, 232, 255];
    }
    return [fgR, fgG, fgB, 255];
  }

  return [r, g, b, 255];
}

function renderPNGSize(size) {
  const rgba = Buffer.alloc(size * size * 4);
  const samples = 4; // 4x4 supersampling anti-aliasing
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let sumR = 0,
        sumG = 0,
        sumB = 0,
        sumA = 0;
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const nx = ((x + (sx + 0.5) / samples) / size) * 64;
          const ny = ((y + (sy + 0.5) / samples) / size) * 64;
          const [pr, pg, pb, pa] = sampleIcon(nx, ny);
          sumR += pr * (pa / 255);
          sumG += pg * (pa / 255);
          sumB += pb * (pa / 255);
          sumA += pa;
        }
      }
      const total = samples * samples;
      const outA = Math.round(sumA / total);
      const idx = (y * size + x) * 4;
      if (outA === 0) {
        rgba[idx] = 0;
        rgba[idx + 1] = 0;
        rgba[idx + 2] = 0;
        rgba[idx + 3] = 0;
      } else {
        const alphaNorm = sumA / 255;
        rgba[idx] = Math.min(255, Math.round(sumR / alphaNorm));
        rgba[idx + 1] = Math.min(255, Math.round(sumG / alphaNorm));
        rgba[idx + 2] = Math.min(255, Math.round(sumB / alphaNorm));
        rgba[idx + 3] = outA;
      }
    }
  }
  return encodePNG(size, size, rgba);
}

function createICO(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const { size, png } of pngBuffersWithSizes) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffersWithSizes.map((p) => p.png)]);
}

fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const png16 = renderPNGSize(16);
const png32 = renderPNGSize(32);
const png48 = renderPNGSize(48);
const png180 = renderPNGSize(180);

fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), png16);
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-48x48.png'), png48);
fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), png180);

const ico = createICO([
  { size: 16, png: png16 },
  { size: 32, png: png32 },
  { size: 48, png: png48 },
]);
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), ico);

console.log('Generated favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, apple-touch-icon.png, and favicon.ico');
