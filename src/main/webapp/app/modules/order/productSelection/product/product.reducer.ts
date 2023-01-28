import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'app/shared/model/product.model';

export interface ProductObject {
  Wein: Array<IProduct>;
  Kaviar: Array<IProduct>;
}

const initialState: ProductObject = {
  /* Wein: [],
  Kaviar: [], */
  Wein: [
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
  ],
  Kaviar: [
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
  ],
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, data) {
      const addedProductIds = state[data.payload.productCategory.name].map(product => {
        return product.id;
      });
      if (!addedProductIds.includes(data.payload.id)) {
        state[data.payload.productCategory.name].push(data.payload);
      }
    },
    removeProduct(state, data) {
      const addedProductIds = state[data.payload.productCategory.name].map(product => {
        return product.id;
      });
      if (addedProductIds.includes(data.payload.id)) {
        const index = addedProductIds.indexOf(data.payload.id);
        if (index > -1) {
          state[data.payload.productCategory.name].splice(index, 1);
        }
      }
    },
    reset(state) {
      Object.keys(state).map(key => {
        state[key] = [];
      });
    },
  },
});

export const { addProduct, removeProduct, reset } = ProductSlice.actions;

export default ProductSlice.reducer;
