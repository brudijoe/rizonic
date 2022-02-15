import React, { useState } from "react";
import { taskEdited } from "../../../redux/dataSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux/hooks";
import { IconContext } from "react-icons";
import { GrEdit } from "react-icons/gr";
import { MdDone } from "react-icons/md";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
  taskEntry: {
    taskId: number;
    taskName: string;
    taskStatus: string;
  };
}

const EditTask = (props: Props) => {
  const dispatch = useAppDispatch();

  const [isTaskEdited, setIsTaskEdited] = useState(false);
  const handleEditTask = () => {
    setIsTaskEdited(!isTaskEdited);
  };

  const [taskName, setTaskName] = useState<string>(props.taskEntry.taskName);
  const handleTaskNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTaskName(e.currentTarget.value);

  const taskStatus = ["", "In progress", "On hold", "Done"];
  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("");

  const handleNewTaskStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTaskStatus(e.currentTarget.value);
  };

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;
  const currentTaskIdProps = props.taskEntry.taskId;

  const handleTaskEdited = async () => {
    if (taskName.length > 0) {
      try {
        const resultAction = await dispatch(
          taskEdited({
            currentCustomerIdProps,
            currentProjectIdProps,
            currentTaskIdProps,
            taskName,
            taskStatus: currentTaskStatus,
          })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to edit project: ", err);
      }
      setIsTaskEdited(!isTaskEdited);
    }
  };

  return (
    <>
      <td data-cy="task-id-tbody">{props.taskEntry.taskId}</td>
      {isTaskEdited ? (
        <td className="">
          <input
            maxLength={20}
            className="text-center"
            value={taskName}
            onChange={handleTaskNameChanged}
            autoFocus
            data-cy="edit-task-input"
          />
        </td>
      ) : (
        <td>{props.taskEntry.taskName}</td>
      )}
      {isTaskEdited ? (
        <td>
          <select
            className=""
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
        </td>
      ) : (
        <td>{props.taskEntry.taskStatus}</td>
      )}

      <td>Empty</td>
      <td>
        <div className="flex items-center justify-center">
          {isTaskEdited ? (
            <button
              type="button"
              className="rounded bg-green-500 border-black border hover:bg-green-300"
              onClick={() => {
                handleEditTask();
                handleTaskEdited();
              }}
            >
              <IconContext.Provider value={{ size: "1.25em" }}>
                <MdDone />
              </IconContext.Provider>
            </button>
          ) : (
            <button
              type="button"
              className="rounded bg-blue-500 border-black border hover:bg-blue-300"
              onClick={handleEditTask}
            >
              <IconContext.Provider value={{ size: "1.25em" }}>
                <GrEdit />
              </IconContext.Provider>
            </button>
          )}
        </div>
      </td>
    </>
  );
};

export default EditTask;
