import React, { useState } from "react";
import { customerAdded } from "../../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

const New = () => {
  // TODO Print error if customername empty
  // TODO Ripple Effect for Next Button
  // TODO Animation from 1 to 2 to 3 ?
  // TODO Conditional Rendering for Save Button to "Saved"
  const dispatch = useAppDispatch();

  const [customerName, setCustomerName] = useState<string>("");
  const onCustomerNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setCustomerName(e.currentTarget.value);

  const customers = useAppSelector((state) => state.data.customers);
  const lastCustomerId = useAppSelector(
    (state) => state.data.customers[customers.length - 1].customerId
  );

  const [projectName, setProjectName] = useState<string>("");
  const onProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);

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
    if (customerName.length > 0 && isAddCustomerStepActive) {
      setIsAddProjectStepActive(true);
      setIsAddCustomerStepActive(false);
    }
    if (projectName.length > 0 && isAddProjectStepActive) {
      setIsAddTaskStepActive(true);
      setIsAddProjectStepActive(false);
    }
  };

  const onSaveMultiStepperClicked = async () => {
    // TODO Taskname should be > 0
    if (customerName.length > 0) {
      try {
        const resultAction = await dispatch(
          customerAdded({
            customerId: lastCustomerId + 1,
            customerName: customerName,
            projects: [
              {
                projectId: 1,
                projectName,
                projectStatus: "",
                tasks: [
                  {
                    taskId: 1,
                    taskName: "",
                    taskStatus: "",
                    employee: "",
                  },
                ],
              },
            ],
          })
        );
        unwrapResult(resultAction);
        setCustomerName("");
      } catch (err) {
        console.error("Failed to add new customer: ", err);
      }
    }
  };

  return (
    <div className="w-10/12 h-full min-h-screen bg-gray-600 p-3">
      <div className="p-3 mb-3 bg-gray-100 rounded border border-black">
        <h1 className="text-2xl font-bold">New</h1>
      </div>
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
            <div className="">Customer-Name:</div>
            <input
              className="h-7 mb-3 p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={onCustomerNameChanged}
              value={customerName}
              minLength={2}
              maxLength={100}
              autoFocus
              data-cy="add-customer-input"
            />
            <button
              type="button"
              className="h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
              onClick={handleNextClick}
              data-cy="add-customer-next-button"
            >
              Next
            </button>
          </div>
        )}
        {isAddProjectStepActive && (
          <div className="flex flex-col">
            <div className="">Project-Name:</div>
            <input
              className="h-7 mb-3 p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={onProjectNameChanged}
              value={projectName}
              minLength={2}
              maxLength={100}
              autoFocus
              data-cy="add-project-input"
            />

            <div className="flex flex-row">
              <button
                type="button"
                className="mr-3 h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                onClick={handlePreviousClick}
                data-cy="customer-previous-button"
              >
                Previous
              </button>

              <button
                type="button"
                className="h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                onClick={handleNextClick}
                data-cy="save-customer-next-button"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {isAddTaskStepActive && (
          <div className="flex flex-col">
            <div className="">Task-Name:</div>
            <input
              className="h-7 mb-3 p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              // onChange={onCustomerNameChanged}
              // value={customerName}
              minLength={2}
              maxLength={100}
              autoFocus
              data-cy="add-task-input"
            />

            <div className="flex flex-row">
              <button
                type="button"
                className="mr-3 h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                onClick={handlePreviousClick}
                data-cy="customer-previous-button"
              >
                Previous
              </button>

              <button
                type="button"
                className="h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
                onClick={onSaveMultiStepperClicked}
                data-cy="save-customer-next-button"
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
