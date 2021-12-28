import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialCustomer {
  testArray: Array<number>,
  currentCustomerId: number,
  currentProjectId: number,
  customers: 
    {
      customerId: number,
      customerName: string,
      projects: [
        {
          projectId: number,
          projectName: string,
        },
      ],
    }[],
  
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
    {
      customerId: 2,
      customerName: "",
      projects: [
        {
          projectId: 1,
          projectName: "",
        },
      ],
    },
    {
      customerId: 3,
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

interface CustomerIdAndCustomers {
  currentCustomerIdProps: number;
  customers: 
    {
      customerId: number;
      customerName: string;
      projects: [
        {
          projectId: number;
          projectName: string;
        }
      ];
    }[]
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    currentCustomerIdUpdate(state, action) {
      //   state.customers = action.payload;
    },
    customerAdded(state, action) {
        state.customers.push(action.payload);
    },
    customerDeleted(state, action: PayloadAction<CustomerIdAndCustomers>) {
      const { currentCustomerIdProps, customers } = action.payload;

      const existingObject = state.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      );
      
      if (existingObject) {
        // console.log("customer gefunden");
        let newCustomers = customers.filter((customerEntry) => {
          return customerEntry.customerId !== currentCustomerIdProps;
        })
        state.customers = newCustomers;
      } else {
        console.log("customer nicht gefunden");
      }

    },
  },
  extraReducers: {},
});

export const { currentCustomerIdUpdate, customerAdded, customerDeleted } = dataSlice.actions;

export default dataSlice.reducer;
