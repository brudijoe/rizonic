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

  const handleNextClick = () => {
    if (customerName.length > 0) {
      if (isAddCustomerStepActive) {
        setIsAddProjectStepActive(true);
        setIsAddCustomerStepActive(false);
      }
      if (isAddProjectStepActive) {
        setIsAddTaskStepActive(true);
        setIsAddProjectStepActive(false);
      }
    }
  };

  const onSaveMultiStepperClicked = async () => {
    if (customerName.length > 1) {
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
      <div className="flex flex-row justify-around p-3 mb-3 bg-gray-100 rounded border border-black">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold bg-green-500 rounded-full w-8 text-center">
            1
          </h1>
          <h1 className="text-2xl font-bold">Add Customer</h1>
        </div>
        <div className="flex flex-col items-center">
          <h1
            className={
              isAddProjectStepActive || isAddTaskStepActive
                ? "text-2xl font-bold bg-green-500 rounded-full w-8 text-center"
                : "text-2xl font-bold text-center"
            }
          >
            2
          </h1>
          <h1 className="text-2xl font-bold">Add Project</h1>
        </div>
        <div className="flex flex-col items-center">
          <h1
            className={
              isAddTaskStepActive
                ? "text-2xl font-bold bg-green-500 rounded-full w-8 text-center"
                : "text-2xl font-bold text-center"
            }
          >
            3
          </h1>
          <h1 className="text-2xl font-bold">Add Task</h1>
        </div>
      </div>

      <div className="p-3 bg-gray-100 rounded border border-black">
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
          </div>
        )}

        {isAddTaskStepActive ? (
          <button
            type="button"
            className="h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
            onClick={onSaveMultiStepperClicked}
            data-cy="save-customer-next-button"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="h-7 w-20 rounded bg-green-500 border-black border hover:bg-green-300"
            onClick={handleNextClick}
            data-cy="add-customer-next-button"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default New;
