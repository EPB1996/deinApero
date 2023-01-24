import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PackageTemplate from './package-template';
import PackageTemplateDetail from './package-template-detail';
import PackageTemplateUpdate from './package-template-update';
import PackageTemplateDeleteDialog from './package-template-delete-dialog';

const PackageTemplateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PackageTemplate />} />
    <Route path="new" element={<PackageTemplateUpdate />} />
    <Route path=":id">
      <Route index element={<PackageTemplateDetail />} />
      <Route path="edit" element={<PackageTemplateUpdate />} />
      <Route path="delete" element={<PackageTemplateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PackageTemplateRoutes;
