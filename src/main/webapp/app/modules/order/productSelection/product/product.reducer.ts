import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'app/shared/model/product.model';

export interface ProductObject {
  wein: Array<string>;
  kaviar: Array<string>;
}

const initialState: ProductObject = {
  wein: [],
  kaviar: [],
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, data) {
      if (data.payload.productCategory.name === 'Wein' && !state.wein.includes(data.payload.id)) {
        state.wein.push(data.payload.id);
      } else if (data.payload.productCategory.name === 'Kaviar' && !state.kaviar.includes(data.payload.id)) {
        state.kaviar.push(data.payload.id);
      }
    },
    removeProduct(state, data) {
      if (data.payload.productCategory.name === 'Wein' && state.wein.includes(data.payload.id)) {
        const index = state.wein.indexOf(data.payload.id);
        if (index > -1) {
          state.wein.splice(index, 1);
        }
      } else if (data.payload.productCategory.name === 'Kaviar' && state.kaviar.includes(data.payload.id)) {
        const index = state.kaviar.indexOf(data.payload.id);
        if (index > -1) {
          state.kaviar.splice(index, 1);
        }
      }
    },
  },
});

export const { addProduct, removeProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
