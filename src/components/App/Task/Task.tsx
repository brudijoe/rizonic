import React from "react";
import { IconContext } from "react-icons";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { taskDeleted } from "../../../redux/dataSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

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
    }[];
  };
}

const Task = (props: Props) => {
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
          tasks: props.projectEntry.tasks,
        })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.error("Failed to delete project: ", err);
    }
  };

  return (
    <div>
      <h1 className="font-bold" data-cy="task-information">
        Task-Information
      </h1>
      <table className="w-full text-center border border-black divide-y divide-black">
        <thead className="bg-gray-200">
          <tr className="">
            <th className="">Task-ID</th>
            <th>Task-Name</th>
            <th>Task-Status</th>
            <th>Employee</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-black">
          {props.projectEntry.tasks.map((taskEntry) => (
            <tr key={taskEntry.taskId} className="">
              <td data-cy="task-id-tbody">{taskEntry.taskId}</td>
              <td>{taskEntry.taskName}</td>
              <td>{taskEntry.taskStatus}</td>
              <td>Placeholder-Bob</td>
              <td>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="rounded bg-blue-500 border-black border hover:bg-blue-300"
                    // onClick={}
                  >
                    <IconContext.Provider value={{ size: "1.25em" }}>
                      <GrEdit />
                    </IconContext.Provider>
                  </button>
                </div>
              </td>
              <td className="">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="rounded bg-red-500 border-black border hover:bg-red-300"
                    onClick={() => handleTaskDeleted(taskEntry.taskId)}
                    data-cy="delete-task-icon"
                  >
                    <IconContext.Provider value={{ size: "1.25em" }}>
                      <MdDelete />
                    </IconContext.Provider>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
