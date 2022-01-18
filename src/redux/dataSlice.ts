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
          projectStatus: string
        }[],
    }[],
}

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
          projectStatus: string
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
      projectStatus: string
    }[],
}

const initialState: InitialCustomer = {
  customers: [
    {
      customerId: 1,
      customerName: "C1",
      projects: [
        {
          projectId: 2,
          projectName: "C1_P1",
          projectStatus: "In progress"
        },
        {
          projectId: 5,
          projectName: "C1_P2",
          projectStatus: "On hold"
        },
        {
          projectId: 15,
          projectName: "C1_P3",
          projectStatus: "Done"
        },
      ],
    },
    {
      customerId: 5,
      customerName: "C5",
      projects: [
        {
          projectId: 1,
          projectName: "C2_P1",
          projectStatus: "In progress"
        },
        {
          projectId: 150,
          projectName: "C2_P2",
          projectStatus: "In progress"
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
          projectStatus: "In progress"
        },
      ],
    },
  ],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    customerAdded(state, action) {
        state.customers.push(action.payload);
    },
    customerEdited(state, action) {
      const { currentCustomerIdProps, customerName } = action.payload;
      
      const existingObject = state.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      );
      
      if (existingObject) {
        console.log("Customer found");
        existingObject.customerName = customerName;
      } else {
        console.log("Can't find customer");
      }
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
    projectAdded(state, action) {
      const {currentCustomerIdProps, projectId, projectName, projectStatus } = action.payload;

      const existingObject = state.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      );

      if (existingObject) {
        console.log("Customer found");

        const newProject = {
          projectId: projectId,
          projectName: projectName,
          projectStatus: projectStatus,
        }
        existingObject.projects.push(newProject)
      } else {
        console.log("Can't find customer");
      }
  },
    projectEdited(state, action) {
      const { currentCustomerIdProps, currentProjectIdProps, projectName, projectStatus } = action.payload;

      const existingObject = state.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      ).projects.find(
        (obj) => obj.projectId === currentProjectIdProps
      );

      if (existingObject) {
        console.log("Project found");
        existingObject.projectName = projectName;
        existingObject.projectStatus = projectStatus;
      } else {
        console.log("Can't find project");
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

export const { customerAdded, customerEdited, customerDeleted, projectAdded, projectEdited, projectDeleted } = dataSlice.actions;

export default dataSlice.reducer;
