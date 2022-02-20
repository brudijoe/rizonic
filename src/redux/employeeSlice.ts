import { createSlice } from "@reduxjs/toolkit";

export interface InitialEmployee {
  employees: {
    employeeId: number;
    employeeName: string;
  }[];
}

const initialState: InitialEmployee = {
  employees: [
    { employeeId: 1, employeeName: "Ingo" },
    { employeeId: 2, employeeName: "Bob" },
    { employeeId: 3, employeeName: "Inga" },
  ],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    employeeAdded(state, action) {
      // TODO
    },
  },
  extraReducers: {},
});

export const { employeeAdded } = employeeSlice.actions;

export default employeeSlice.reducer;
