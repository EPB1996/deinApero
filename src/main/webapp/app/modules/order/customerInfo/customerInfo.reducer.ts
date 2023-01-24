import { createSlice } from '@reduxjs/toolkit';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface CustomerInfoObject {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
}

const initialState: CustomerInfoObject = {
  firstName: 'Etienne',
  lastName: 'Baumgartner',
  gender: Gender.MALE,
  email: 'baume96@gmail.com',
  phone: '1233412352436',
  addressLine1: 'Nope',
  addressLine2: 'nope2',
  city: 'well nope',
  country: 'Nopeland',
};

export const CustomerInfoSlice = createSlice({
  name: 'customerInfo',
  initialState,
  reducers: {
    addCustomerInfo: (state, data) => {
      return data.payload as CustomerInfoObject;
    },
  },
});

export const { addCustomerInfo } = CustomerInfoSlice.actions;

// Reducer
export default CustomerInfoSlice.reducer;
