import React from "react";
import { taskDeleted } from "../../../redux/dataSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux/hooks";
import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
  tasks: {
    taskId: number;
    taskName: string;
    taskStatus: string;
  }[];
  taskEntry: {
    taskId: number;
    taskName: string;
    taskStatus: string;
  };
}

const DeleteTask = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;

  const handleTaskDeleted = async (currentTaskId: number) => {
    try {
      const resultAction = await dispatch(
        taskDeleted({
          currentCustomerIdProps,
          currentProjectIdProps,
          currentTaskId,
          tasks: props.tasks,
        })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.error("Failed to delete project: ", err);
    }
  };

  return (
    <button
      type="button"
      className="rounded bg-red-500 border-black border hover:bg-red-300"
      onClick={() => handleTaskDeleted(props.taskEntry.taskId)}
      data-cy="delete-task-icon"
    >
      <IconContext.Provider value={{ size: "1.25em" }}>
        <MdDelete />
      </IconContext.Provider>
    </button>
  );
};

export default DeleteTask;
