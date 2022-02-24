import React from "react";
import { taskAdded } from "../../../redux/dataSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux/hooks";
import { IconContext } from "react-icons";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
  projectEntry: {
    projectId: number;
    projectName: string;
    projectStatus: string;
    tasks: {
      taskId: number;
      taskName: string;
      taskStatus: string;
      employee?: string;
    }[];
  };
}

const AddTask = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;

  const tasks = props.projectEntry.tasks;
  const lastTaskId = props.projectEntry.tasks[tasks.length - 1].taskId;

  const handleTaskAdded = async () => {
    try {
      const resultAction = await dispatch(
        taskAdded({
          currentCustomerIdProps,
          currentProjectIdProps,
          taskId: lastTaskId + 1,
        })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.error("Failed to add task: ", err);
    }
  };

  return (
    <IconContext.Provider value={{ size: "1.25em", color: "#15803d" }}>
      <AiOutlinePlusCircle
        className="cursor-pointer"
        onClick={handleTaskAdded}
        data-cy="add-task-icon"
      />
    </IconContext.Provider>
  );
};

export default AddTask;
