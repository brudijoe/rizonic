import React from "react";
import DeleteProject from "./DeleteProject";

interface Props {
  currentCustomerId: number;
  projectEntry: {
    projectId: number;
    projectName: string;
  };
}

const Project = (props: Props) => {
  return (
    <div>
      <h1>Project-Information</h1>
      <div>Project-ID:&nbsp;{props.projectEntry.projectId}</div>
      <div>Project-Name:&nbsp;{props.projectEntry.projectName}</div>
      <div className="mt-3">
        <DeleteProject
          currentCustomerId={props.currentCustomerId}
          currentProjectId={props.projectEntry.projectId}
        />
      </div>
    </div>
  );
};

export default Project;
