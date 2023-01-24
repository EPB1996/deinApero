import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PackageType from './package-type';
import PackageTypeDetail from './package-type-detail';
import PackageTypeUpdate from './package-type-update';
import PackageTypeDeleteDialog from './package-type-delete-dialog';

const PackageTypeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PackageType />} />
    <Route path="new" element={<PackageTypeUpdate />} />
    <Route path=":id">
      <Route index element={<PackageTypeDetail />} />
      <Route path="edit" element={<PackageTypeUpdate />} />
      <Route path="delete" element={<PackageTypeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PackageTypeRoutes;
