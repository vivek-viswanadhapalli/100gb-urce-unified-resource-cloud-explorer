/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WorkspaceProvider } from './hooks/useWorkspace';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { ExploreProvidersPage } from './pages/ExploreProvidersPage';
import { ProviderDetailsPage } from './pages/ProviderDetailsPage';
import { ComparePage } from './pages/ComparePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <WorkspaceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="providers" element={<ExploreProvidersPage />} />
            <Route path="providers/:id" element={<ProviderDetailsPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="workspace" element={<WorkspacePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WorkspaceProvider>
  );
}
