import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'app/shared/model/product.model';

export interface ProductObject {
  Wein: Array<string>;
  Kaviar: Array<string>;
}

const initialState: ProductObject = {
  Wein: [],
  Kaviar: [],
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, data) {
      if (data.payload.productCategory.name === 'Wein' && !state.Wein.includes(data.payload.id)) {
        state.Wein.push(data.payload.id);
      } else if (data.payload.productCategory.name === 'Kaviar' && !state.Kaviar.includes(data.payload.id)) {
        state.Kaviar.push(data.payload.id);
      }
    },
    removeProduct(state, data) {
      if (data.payload.productCategory.name === 'Wein' && state.Wein.includes(data.payload.id)) {
        const index = state.Wein.indexOf(data.payload.id);
        if (index > -1) {
          state.Wein.splice(index, 1);
        }
      } else if (data.payload.productCategory.name === 'Kaviar' && state.Kaviar.includes(data.payload.id)) {
        const index = state.Kaviar.indexOf(data.payload.id);
        if (index > -1) {
          state.Kaviar.splice(index, 1);
        }
      }
    },
  },
});

export const { addProduct, removeProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
