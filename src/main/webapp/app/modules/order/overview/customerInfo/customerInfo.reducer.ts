import { createSlice } from '@reduxjs/toolkit';
import { Gender } from 'app/shared/model/enumerations/gender.model';

/* export interface CustomerInfoObject {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
  step?: Number;
} */

const initialState = {
  firstName: 'Et',
  lastName: '',
  gender: Gender.MALE,
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  step: 0,
};

export const CustomerInfoSlice = createSlice({
  name: 'customerInfo',
  initialState,
  reducers: {
    addCustomerInfo(state, data) {
      return { ...state, ...data.payload };
    },
  },
});

export const { addCustomerInfo } = CustomerInfoSlice.actions;

// Reducer
export default CustomerInfoSlice.reducer;
