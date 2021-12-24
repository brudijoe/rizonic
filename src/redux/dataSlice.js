import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
