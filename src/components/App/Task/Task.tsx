import React from "react";
import { IconContext } from "react-icons";
import { GrEdit } from "react-icons/gr";
import DeleteTask from "./DeleteTask";
import AddTask from "./AddTask";

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
  const tasks = props.projectEntry.tasks;

  return (
    <div>
      <div className="flex flex-row items-center">
        <h1 className="font-bold mr-1" data-cy="task-information">
          Task-Information
        </h1>
        <AddTask
          currentCustomerId={props.currentCustomerId}
          currentProjectId={props.projectEntry.projectId}
          projectEntry={props.projectEntry}
        />
      </div>
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
              <td>Empty</td>
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
                  <DeleteTask
                    currentCustomerId={props.currentCustomerId}
                    currentProjectId={props.projectEntry.projectId}
                    tasks={tasks}
                    taskEntry={taskEntry}
                  />
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
