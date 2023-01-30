import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'app/shared/model/product.model';

export interface ProductObject {
  Champagne: Array<IProduct>;
  Kaviar: Array<IProduct>;
  Paté: Array<IProduct>;
}

const initialState: ProductObject = {
  Champagne: [],
  Kaviar: [],
  Paté: [],
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, data) {
      const addedProductIds = state[data.payload.productCategory].map(product => {
        return product.id;
      });
      if (!addedProductIds.includes(data.payload.id)) {
        state[data.payload.productCategory].push(data.payload.product);
      }
    },
    removeProduct(state, data) {
      const addedProductIds = state[data.payload.productCategory].map(product => {
        return product.id;
      });
      if (addedProductIds.includes(data.payload.product.id)) {
        const index = addedProductIds.indexOf(data.payload.product.id);
        if (index > -1) {
          state[data.payload.productCategory].splice(index, 1);
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
