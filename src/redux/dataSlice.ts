import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialCustomer {
  customers: {
    customerId: number;
    customerName: string;
    projects: {
      projectId: number;
      projectName: string;
      projectStatus: string;
      tasks: {
        taskId: number;
        taskName: string;
        taskStatus: string;
        employee?: string;
      }[];
    }[];
  }[];
}

interface CustomerIdAndCustomers {
  currentCustomerIdProps: number;
  customers: {
    customerId: number;
    customerName: string;
    projects: {
      projectId: number;
      projectName: string;
      projectStatus: string;
      tasks: {
        taskId: number;
        taskName: string;
        taskStatus: string;
        employee?: string;
      }[];
    }[];
  }[];
}

interface CustomerIdAndProjects {
  currentCustomerIdProps: number;
  currentProjectIdProps: number;
  projects: {
    projectId: number;
    projectName: string;
    projectStatus: string;
    tasks: {
      taskId: number;
      taskName: string;
      taskStatus: string;
      employee?: string;
    }[];
  }[];
}

interface CustomerIdAndTasks {
  currentCustomerIdProps: number;
  currentProjectIdProps: number;
  currentTaskId: number;
  tasks: {
    taskId: number;
    taskName: string;
    taskStatus: string;
    employee?: string;
  }[];
}

interface CustomerIdAndProjectId {
  currentCustomerIdProps: number;
  currentProjectIdProps: number;
  taskId: number;
}

interface CustomerIdAndProjectIdAndTaskId {
  currentCustomerIdProps: number;
  currentProjectIdProps: number;
  currentTaskIdProps: number;
  taskName: string;
  taskStatus: string;
  employee?: string;
}

const initialState: InitialCustomer = {
  customers: [
    {
      customerId: 1,
      customerName: "C1",
      projects: [
        {
          projectId: 2,
          projectName: "Grow Tomato",
          projectStatus: "In progress",
          tasks: [
            {
              taskId: 1,
              taskName: "Mix Soil",
              taskStatus: "In progress",
            },
            {
              taskId: 2,
              taskName: "Plant Seed",
              taskStatus: "In progress",
            },
            {
              taskId: 3,
              taskName: "Water Seed",
              taskStatus: "In progress",
            },
          ],
        },
        {
          projectId: 5,
          projectName: "C1_P2",
          projectStatus: "On hold",
          tasks: [
            {
              taskId: 1,
              taskName: "Plant Seed",
              taskStatus: "In progress",
            },
          ],
        },
        {
          projectId: 15,
          projectName: "C1_P3",
          projectStatus: "Done",
          tasks: [
            {
              taskId: 1,
              taskName: "Plant Seed",
              taskStatus: "In progress",
            },
          ],
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
          projectStatus: "In progress",
          tasks: [
            {
              taskId: 1,
              taskName: "Plant Seed",
              taskStatus: "In progress",
            },
          ],
        },
        {
          projectId: 150,
          projectName: "C2_P2",
          projectStatus: "In progress",
          tasks: [
            {
              taskId: 1,
              taskName: "Plant Seed",
              taskStatus: "In progress",
            },
          ],
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
          projectStatus: "In progress",
          tasks: [
            {
              taskId: 1,
              taskName: "Plant Seed",
              taskStatus: "In progress",
            },
          ],
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
        });
        state.customers = newCustomers;
      } else {
        console.log("Can't find customer");
      }
    },
    projectAdded(state, action) {
      const { currentCustomerIdProps, projectId, projectName, projectStatus } =
        action.payload;

      const existingObject = state.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      );

      if (existingObject) {
        console.log("Customer found");

        const newProject = {
          projectId: projectId,
          projectName: projectName,
          projectStatus: projectStatus,
          // ! Check later after implementation
          tasks: [
            {
              taskId: 1,
              taskName: "",
              taskStatus: "In progress",
            },
          ],
        };
        existingObject.projects.push(newProject);
      } else {
        console.log("Can't find customer");
      }
    },
    projectEdited(state, action) {
      const {
        currentCustomerIdProps,
        currentProjectIdProps,
        projectName,
        projectStatus,
      } = action.payload;

      const existingObject = state.customers
        .find((obj) => obj.customerId === currentCustomerIdProps)
        .projects.find((obj) => obj.projectId === currentProjectIdProps);

      if (existingObject) {
        console.log("Project found");
        existingObject.projectName = projectName;
        existingObject.projectStatus = projectStatus;
      } else {
        console.log("Can't find project");
      }
    },
    projectDeleted(state, action: PayloadAction<CustomerIdAndProjects>) {
      const { currentCustomerIdProps, currentProjectIdProps, projects } =
        action.payload;

      const existingObject = state.customers
        .find((obj) => obj.customerId === currentCustomerIdProps)
        .projects.find((obj) => obj.projectId === currentProjectIdProps);

      if (existingObject) {
        console.log("Project found");

        let newProjects = projects.filter((projectEntry) => {
          return projectEntry.projectId !== currentProjectIdProps;
        });

        state.customers.find(
          (obj) => obj.customerId === currentCustomerIdProps
        ).projects = newProjects;
      } else {
        console.log("Can't find project");
      }
    },
    taskAdded(state, action: PayloadAction<CustomerIdAndProjectId>) {
      // TODO
      const { currentCustomerIdProps, currentProjectIdProps, taskId } =
        action.payload;

      const existingObject = state.customers
        .find((obj) => obj.customerId === currentCustomerIdProps)
        .projects.find((obj) => obj.projectId === currentProjectIdProps);

      if (existingObject) {
        console.log("Project found");

        const newTask = {
          taskId,
          taskName: "Empty",
          taskStatus: "In progress",
        };
        existingObject.tasks.push(newTask);
      } else {
        console.log("Can't find project");
      }
    },
    taskEdited(state, action: PayloadAction<CustomerIdAndProjectIdAndTaskId>) {
      // TODO
      const {
        currentCustomerIdProps,
        currentProjectIdProps,
        currentTaskIdProps,
        taskName,
        taskStatus,
        employee,
      } = action.payload;

      const existingObject = state.customers
        .find((obj) => obj.customerId === currentCustomerIdProps)
        .projects.find((obj) => obj.projectId === currentProjectIdProps)
        .tasks.find((obj) => obj.taskId === currentTaskIdProps);

      if (existingObject) {
        console.log("Task found");
        existingObject.taskName = taskName;
        existingObject.taskStatus = taskStatus;
        existingObject.employee = employee
      } else {
        console.log("Can't find task");
      }
    },
    taskDeleted(state, action: PayloadAction<CustomerIdAndTasks>) {
      const {
        currentCustomerIdProps,
        currentProjectIdProps,
        currentTaskId,
        tasks
      } = action.payload;

      const existingObject = state.customers
        .find((obj) => obj.customerId === currentCustomerIdProps)
        .projects.find((obj) => obj.projectId === currentProjectIdProps)
        .tasks.find((obj) => obj.taskId === currentTaskId);

      if (existingObject) {
        console.log("Task found");

        let newTasks = tasks.filter((taskEntry) => {
          return taskEntry.taskId !== currentTaskId;
        });

        state.customers
          .find((obj) => obj.customerId === currentCustomerIdProps)
          .projects.find(
            (obj) => obj.projectId === currentProjectIdProps
          ).tasks = newTasks;
      } else {
        console.log("Can't find task");
      }
    },
  },
  extraReducers: {},
});

export const {
  customerAdded,
  customerEdited,
  customerDeleted,
  projectAdded,
  projectEdited,
  projectDeleted,
  taskAdded,
  taskEdited,
  taskDeleted,
} = dataSlice.actions;

export default dataSlice.reducer;
