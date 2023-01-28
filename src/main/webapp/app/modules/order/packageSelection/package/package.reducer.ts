import { createSlice } from '@reduxjs/toolkit';
import { IPackageType } from 'app/shared/model/package-type.model';
import { IProduct } from 'app/shared/model/product.model';

export interface PackageObject {
  packageType: IPackageType;
  productsByCategory: any;
}

const initialState: PackageObject = {
  /* packageType: {}, */
  packageType: {
    id: '63cff8ad056acc2c5aa673ef',
    name: 'Package 1 ',
    description: null,
    price: 99,
    packageTemplate: {
      id: '63cff899056acc2c5aa673ee',
      name: 'Package Template 1',
      products: [
        {
          id: '63cff8eb056acc2c5aa673f1',
          name: 'Basic Weint',
          description: 'Basic Wein Description',
          price: 30,

          image: null,
          imageContentType: null,
          productCategory: {
            id: '63cff8c7056acc2c5aa673f0',
            name: 'Wein',
            description: 'Wein Descprition',
          },
        },
        {
          id: '63d039e8f6f35d538fbf0fcc',
          name: 'Basic Wein 2 ',
          description: 'Basic Wein 2 Description',
          price: 99,

          image: null,
          imageContentType: null,
          productCategory: {
            id: '63cff8c7056acc2c5aa673f0',
            name: 'Wein',
            description: 'Wein Descprition',
          },
        },
        {
          id: '63d039fcf6f35d538fbf0fcd',
          name: 'Basic Kaviar',
          description: 'Basic Kaviar Description',
          price: 99,

          image: null,
          imageContentType: null,
          productCategory: {
            id: '63d039cbf6f35d538fbf0fcb',
            name: 'Kaviar',
            description: 'Kaviar Description',
          },
        },
        {
          id: '63d03a12f6f35d538fbf0fce',
          name: 'Basic Kaviar 2 ',
          description: 'Basic Kaviar 2 Description',
          price: 88,

          image: null,
          imageContentType: null,
          productCategory: {
            id: '63d039cbf6f35d538fbf0fcb',
            name: 'Kaviar',
            description: 'Kaviar Description',
          },
        },
        {
          id: '63d05cc6a2a3516006b8fc71',
          name: 'Wein 3 ',
          description: 'Wein Description 3',
          price: 0,

          image: null,
          imageContentType: null,
          productCategory: {
            id: '63cff8c7056acc2c5aa673f0',
            name: 'Wein',
            description: 'Wein Descprition',
          },
        },
        {
          id: '63d3c344cbff3d62fd72b6af',
          name: 'Wein Overflow',
          description: 'adsf',
          price: 2,

          image: null,
          imageContentType: null,
          productCategory: {
            id: '63cff8c7056acc2c5aa673f0',
            name: 'Wein',
            description: 'Wein Descprition',
          },
        },
      ],
    },
  },
  productsByCategory: {},
};

const PackageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    addPackageType(state, data) {
      const productsPerCategory = {
        Wein: [],
        Kaviar: [],
      };

      Array.from(data.payload.packageTemplate.products).map((product: IProduct) => {
        productsPerCategory[product.productCategory.name].push(product);
      });

      state.packageType = data.payload;
      state.productsByCategory = productsPerCategory;
    },
  },
});

export const { addPackageType } = PackageSlice.actions;

export default PackageSlice.reducer;
