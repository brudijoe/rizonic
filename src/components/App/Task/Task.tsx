import React from "react";

interface Props {
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
  return (
    <div>
      {props.projectEntry.tasks.map((taskEntry) => (
        <div
          key={taskEntry.taskId}
          className="w-full rounded border border-black p-3 mt-3 bg-gray-400"
        >
          <div>
            <h1 className="font-bold">Task-Information</h1>
            <div>Task-ID:&nbsp;{taskEntry.taskId}</div>
            <div>Task-Name:&nbsp;{taskEntry.taskName}</div>
            <div>Task-Status:&nbsp;{taskEntry.taskStatus}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
