import React from "react";
import DeleteTask from "./DeleteTask";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

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
      <table className="w-full text-center">
        <thead className="bg-gray-300">
          <tr className="">
            <th className="">Task-ID</th>
            <th>Task-Name</th>
            <th>Task-Status</th>
            <th>Employee</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.projectEntry.tasks.map((taskEntry) => (
            <tr key={taskEntry.taskId} className="even:bg-gray-200">
              <EditTask
                currentCustomerId={props.currentCustomerId}
                currentProjectId={props.projectEntry.projectId}
                taskEntry={taskEntry}
              />
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
