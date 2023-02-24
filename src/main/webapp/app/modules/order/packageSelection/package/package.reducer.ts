import { createSlice } from '@reduxjs/toolkit';
import { IPackageType } from 'app/shared/model/package-type.model';
import { IProduct } from 'app/shared/model/product.model';

export interface PackageObject {
  packageType: IPackageType;
  productsByCategory: any;
}

const initialState: PackageObject = {
  packageType: {},
  productsByCategory: {},
};

const PackageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    /*  addPackageType(state, data) {
      const productsPerCategory = {
        Wein: [],
        Kaviar: [],
      };

      Array.from(data.payload.packageTemplate.products).map((product: IProduct) => {
        productsPerCategory[product.productCategory.name].push(product);
      });

      state.packageType = data.payload;
      state.productsByCategory = productsPerCategory;
    }, */
  },
});

export const {} = PackageSlice.actions;

export default PackageSlice.reducer;
