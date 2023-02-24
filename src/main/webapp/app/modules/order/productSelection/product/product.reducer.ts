import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'app/shared/model/product.model';

export interface ProductObject {
  Champagne: {};
  Austern: {};
  Kaviar: {};
  Platten: {};
  Vegetarisch: {};
}

const initialState: ProductObject = {
  Champagne: {},
  Austern: {},
  Kaviar: {},
  Platten: {},
  Vegetarisch: {},
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, data) {
      const addedProductIds = Object.keys(state[data.payload.productCategory]);
      if (addedProductIds.includes(data.payload.product.id)) {
        state[data.payload.productCategory][data.payload.product.id].amount += 1;
      } else {
        const firstTimeAdd = { amount: 1, product: data.payload.product };
        state[data.payload.productCategory][data.payload.product.id] = firstTimeAdd;
      }
    },
    removeProduct(state, data) {
      const addedProductIds = Object.keys(state[data.payload.productCategory]);
      if (addedProductIds.includes(data.payload.product.id)) {
        if (state[data.payload.productCategory][data.payload.product.id].amount === 1) {
          delete state[data.payload.productCategory][data.payload.product.id];
        } else {
          state[data.payload.productCategory][data.payload.product.id].amount -= 1;
        }
      }
    },
    reset() {
      return initialState;
    },
  },
});

export const { addProduct, removeProduct, reset } = ProductSlice.actions;

export default ProductSlice.reducer;
