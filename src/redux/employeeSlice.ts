import { createSlice } from "@reduxjs/toolkit";

export interface InitialEmployee {
  employees: {
    employeeId: number;
    employeeName: string;
    employeeDepartment: string,
    employeeEntryDate: string;
  }[];
}

const initialState: InitialEmployee = {
  employees: [
    { employeeId: 1, employeeName: "Ingo", employeeEntryDate: new Date("2019-01-16").toLocaleString(), employeeDepartment: "IT" },
    { employeeId: 2, employeeName: "Bob", employeeEntryDate: new Date("2018-10-25").toLocaleString(), employeeDepartment: "Sales" },
    { employeeId: 3, employeeName: "Inga", employeeEntryDate: new Date("2015-04-05").toLocaleString(), employeeDepartment: "Logistics" },
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
