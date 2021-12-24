import { createSlice } from "@reduxjs/toolkit";

export interface InitialCustomer {
  testArray: [number, number, number],
  currentCustomerId: number,
  currentProjectId: number,
  customers: [
    {
      customerId: number,
      customerName: string,
      projects: [
        {
          projectId: number,
          projectName: string,
        },
      ],
    },
  ],
}

const initialState: InitialCustomer = {
  testArray: [1, 2, 3],
  currentCustomerId: 0,
  currentProjectId: 0,
  customers: [
    {
      customerId: 1,
      customerName: "",
      projects: [
        {
          projectId: 1,
          projectName: "",
        },
      ],
    },
  ],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    currentCustomerIdUpdate(state, action) {
      //   state.customers = action.payload;
    },
  },
  extraReducers: {},
});

export const { currentCustomerIdUpdate } = dataSlice.actions;

export default dataSlice.reducer;
