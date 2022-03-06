import React, { useState } from "react";
import { customerAdded } from "../../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

const New = () => {
  // TODO Add Task-Status and Employee
  // TODO Upate Tests accordingly
  const dispatch = useAppDispatch();

  const [customerName, setCustomerName] = useState<string>("");
  const onCustomerNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setCustomerName(e.currentTarget.value);

  const [customerNameError, setCustomerNameError] = useState(false);
  const [projectNameError, setProjectNameError] = useState(false);
  const [taskNameError, setTaskNameError] = useState(false);

  const customers = useAppSelector((state) => state.data.customers);
  const lastCustomerId = useAppSelector(
    (state) => state.data.customers[customers.length - 1].customerId
  );

  const [projectName, setProjectName] = useState<string>("");
  const onProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);
  const projectStatus = ["", "In progress", "On hold", "Done"];
  const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("");
  const handleNewProjectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProjectStatus(e.currentTarget.value);
  };

  const [taskName, setTaskName] = useState<string>("");
  const onTaskNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTaskName(e.currentTarget.value);
  const taskStatus = ["", "In progress", "On hold", "Done"];
  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("");
  const handleNewTaskStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTaskStatus(e.currentTarget.value);
  };

  const [isAddCustomerStepActive, setIsAddCustomerStepActive] = useState(true);
  const [isAddProjectStepActive, setIsAddProjectStepActive] = useState(false);
  const [isAddTaskStepActive, setIsAddTaskStepActive] = useState(false);

  const handlePreviousClick = () => {
    if (isAddProjectStepActive) {
      setIsAddTaskStepActive(false);
      setIsAddProjectStepActive(false);
      setIsAddCustomerStepActive(true);
    }
    if (isAddTaskStepActive) {
      setIsAddTaskStepActive(false);
      setIsAddProjectStepActive(true);
      setIsAddCustomerStepActive(false);
    }
  };

  const handleNextClick = () => {
    if (customerName.length === 0 && isAddCustomerStepActive) {
      setCustomerNameError(true);
    }
    if (projectName.length === 0 && isAddProjectStepActive) {
      setProjectNameError(true);
    }
    if (customerName.length > 0 && isAddCustomerStepActive) {
      setIsAddProjectStepActive(true);
      setIsAddCustomerStepActive(false);
      setCustomerNameError(false);
      setProjectNameError(false);
    }
    if (projectName.length > 0 && isAddProjectStepActive) {
      setIsAddTaskStepActive(true);
      setIsAddProjectStepActive(false);
      setProjectNameError(true);
      setTaskNameError(false);
    }
  };

  const onSaveMultiStepperClicked = async () => {
    if (taskName.length === 0) {
      setTaskNameError(true);
    }
    if (taskName.length > 0) {
      try {
        const resultAction = await dispatch(
          customerAdded({
            customerId: lastCustomerId + 1,
            customerName: customerName,
            projects: [
              {
                projectId: 1,
                projectName,
                projectStatus: currentProjectStatus,
                tasks: [
                  {
                    taskId: 1,
                    taskName: taskName,
                    taskStatus: currentTaskStatus,
                    employee: "",
                  },
                ],
              },
            ],
          })
        );
        unwrapResult(resultAction);
        setCustomerName("");
        setProjectName("");
        setTaskName("");
        setIsAddCustomerStepActive(true);
        setIsAddTaskStepActive(false);
        setIsAddProjectStepActive(false);
      } catch (err) {
        console.error("Failed to add new customer: ", err);
      }
    }
  };

  return (
    <div className="w-10/12 h-full min-h-screen bg-gray-600 p-3">
      <div className="flex flex-col p-3 mb-3 bg-gray-100 rounded border border-black">
        <div className="flex flex-row items-center">
          <h1 className="w-1/5 text-2xl font-bold bg-green-500 rounded-full text-center">
            1
          </h1>

          <hr
            className={
              isAddCustomerStepActive
                ? "w-1/5 border-t-8 border-gray-500"
                : "w-1/5 border-t-8 border-green-500"
            }
          />
          <h1
            className={
              isAddProjectStepActive || isAddTaskStepActive
                ? "w-1/5 text-2xl font-bold bg-green-500 rounded-full text-center"
                : "w-1/5 text-2xl font-bold bg-gray-500 rounded-full text-center"
            }
          >
            2
          </h1>

          <hr
            className={
              isAddTaskStepActive
                ? "w-1/5 border-t-8 border-green-500"
                : "w-1/5 border-t-8 border-gray-500"
            }
          />
          <h1
            className={
              isAddTaskStepActive
                ? "w-1/5 text-2xl font-bold bg-green-500 rounded-full text-center"
                : "w-1/5 text-2xl font-bold bg-gray-500 rounded-full text-center"
            }
          >
            3
          </h1>
        </div>

        <div className="flex flex-row text-center items-center justify-around mb-10">
          <h1 className="w-1/5 text-2xl font-bold">Add Customer</h1>
          <hr className="w-1/5 invisible" />
          <h1 className="w-1/5 text-2xl font-bold">Add Project</h1>
          <hr className="w-1/5 invisible" />
          <h1 className="w-1/5 text-2xl font-bold">Add Task</h1>
        </div>

        {isAddCustomerStepActive && (
          <div className="flex flex-col">
            <label className="font-bold" data-cy="customername-label">
              Customer-Name:
            </label>
            <input
              className="h-7 mb-3 p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={onCustomerNameChanged}
              value={customerName}
              maxLength={100}
              autoFocus
              data-cy="add-customer-input"
            />
            {customerName.length === 0 && customerNameError && (
              <div
                className={
                  "w-full mb-3 p-1 rounded font-bold text-red-700 border-2 border-red-700"
                }
                cy-data="customerName-error"
              >
                Error: Customer-Name can't be empty
              </div>
            )}
            <button
              type="button"
              className={
                customerName.length === 0
                  ? "h-7 w-20 rounded border-black border"
                  : "h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
              }
              onClick={handleNextClick}
              data-cy="add-customer-next-button"
            >
              Next
            </button>
          </div>
        )}
        {isAddProjectStepActive && (
          <div className="flex flex-col">
            <label className="font-bold" data-cy="projectname-label">
              Project-Name:
            </label>
            <input
              className="h-7 mb-3 p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={onProjectNameChanged}
              value={projectName}
              maxLength={100}
              autoFocus
              data-cy="add-project-input"
            />

            <label className="font-bold" data-cy="projectstatus-label">
              Project-Status:
            </label>
            <div className="w-full border border-black rounded mb-3">
              <select
                className="w-full h-7 rounded"
                name="projectstatus"
                id="projectstatus"
                onChange={handleNewProjectStatus}
                data-cy="edit-project-select"
              >
                <option value={projectStatus[0]}>{projectStatus[0]}</option>
                <option value={projectStatus[1]}>{projectStatus[1]}</option>
                <option value={projectStatus[2]}>{projectStatus[2]}</option>
                <option value={projectStatus[3]}>{projectStatus[3]}</option>
              </select>
            </div>

            {projectName.length === 0 && projectNameError && (
              <div
                className={
                  "w-full mb-3 p-1 rounded font-bold text-red-700 border-2 border-red-700"
                }
                cy-data="projectName-error"
              >
                Error: Project-Name can't be empty
              </div>
            )}

            <div className="flex flex-row">
              <button
                type="button"
                className="mr-3 h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                onClick={handlePreviousClick}
                data-cy="project-previous-button"
              >
                Previous
              </button>

              <button
                type="button"
                className={
                  projectName.length === 0
                    ? "h-7 w-20 rounded border-black border"
                    : "h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                }
                onClick={handleNextClick}
                data-cy="add-project-next-button"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {isAddTaskStepActive && (
          <div className="flex flex-col">
            <label className="font-bold" data-cy="taskname-label">
              Task-Name:
            </label>
            <input
              className="h-7 mb-3 p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={onTaskNameChanged}
              value={taskName}
              maxLength={100}
              autoFocus
              data-cy="add-task-input"
            />

            <label className="font-bold" data-cy="taskstatus-label">
              Task-Status:
            </label>
            <div className="w-full border border-black rounded mb-3">
              <select
                className="w-full h-7 rounded"
                name="taskstatus"
                id="taskstatus"
                onChange={handleNewTaskStatus}
                data-cy="edit-task-select"
              >
                <option value={taskStatus[0]}>{taskStatus[0]}</option>
                <option value={taskStatus[1]}>{taskStatus[1]}</option>
                <option value={taskStatus[2]}>{taskStatus[2]}</option>
                <option value={taskStatus[3]}>{taskStatus[3]}</option>
              </select>
            </div>

            {taskName.length === 0 && taskNameError && (
              <div
                className={
                  "w-full mb-3 p-1 rounded font-bold text-red-700 border-2 border-red-700"
                }
                cy-data="taskName-error"
              >
                Error: Task-Name can't be empty
              </div>
            )}

            <div className="flex flex-row">
              <button
                type="button"
                className="mr-3 h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                onClick={handlePreviousClick}
                data-cy="task-previous-button"
              >
                Previous
              </button>

              <button
                type="button"
                className={
                  taskName.length === 0
                    ? "h-7 w-20 rounded border border-black"
                    : "h-7 w-20 rounded border border-black bg-blue-500 hover:bg-blue-300"
                }
                onClick={onSaveMultiStepperClicked}
                data-cy="save-task-next-button"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default New;
