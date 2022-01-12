import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialCustomer {
  customers: 
    {
      customerId: number,
      customerName: string,
      projects: 
        {
          projectId: number,
          projectName: string,
        }[],
    }[],
}

const initialState: InitialCustomer = {
  customers: [
    {
      customerId: 1,
      customerName: "",
      projects: [
        {
          projectId: 2,
          projectName: "C1_P1",
        },
        {
          projectId: 5,
          projectName: "C1_P2",
        },
        {
          projectId: 10,
          projectName: "C1_P3",
        },
      ],
    },
    {
      customerId: 5,
      customerName: "",
      projects: [
        {
          projectId: 1,
          projectName: "C2_P1",
        },
        {
          projectId: 150,
          projectName: "C2_P2",
        },
      ],
    },
    {
      customerId: 10,
      customerName: "",
      projects: [
        {
          projectId: 5,
          projectName: "C3_P1",
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
      projects: 
        {
          projectId: number;
          projectName: string;
        }[],
    }[]
}

interface CustomerIdAndProjects {
  currentCustomerIdProps: number;
  currentProjectIdProps: number,
  projects: 
    {
      projectId: number;
      projectName: string;
    }[],
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
        console.log("Customer found");
        let newCustomers = customers.filter((customerEntry) => {
          return customerEntry.customerId !== currentCustomerIdProps;
        })
        state.customers = newCustomers;
      } else {
        console.log("Can't find customer");
      }
    },
    projectDeleted(state, action: PayloadAction<CustomerIdAndProjects>) {
      const { currentCustomerIdProps, projects, currentProjectIdProps } = action.payload;

      const existingObject = state.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      ).projects.find(
        (obj) => obj.projectId === currentProjectIdProps
      );
      
      if (existingObject) {
        console.log("Project found");
        
        let newProjects = projects.filter((projectEntry) => {
          return projectEntry.projectId !== currentProjectIdProps;
        })
        
        state.customers.find(
          (obj) => obj.customerId === currentCustomerIdProps
        ).projects = newProjects;

      } else {
        console.log("Can't find project");
      }
    },
  },
  extraReducers: {},
});

export const { currentCustomerIdUpdate, customerAdded, customerDeleted, projectDeleted } = dataSlice.actions;

export default dataSlice.reducer;
