import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import AddProject from "./AddProject";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import Task from "../Task/Task";

interface Props {
  currentCustomerId: number;
  customerEntry: {
    customerId: number;
    customerName: string;
    projects: {
      projectId: number;
      projectName: string;
      projectStatus: string;
      tasks: {
        taskId: number;
        taskName: string;
        taskStatus: string;
      }[];
    }[];
  };
}

const Project = (props: Props) => {
  // Dropdown Menu for Projects
  const [dropDownProjects, setDropDownProjects] = useState(false);
  const showDropDownProjects = () => {
    setDropDownProjects(!dropDownProjects);
  };

  return (
    <div className="w-full rounded border border-black p-3 bg-gray-200">
      {dropDownProjects ? (
        <div className="flex flex-row ml-3 mr-3 items-center justify-between">
          <div className="flex flex-row items-center">
            <div>
              <IconContext.Provider value={{ size: "2em" }}>
                <AiOutlineUpCircle
                  className="cursor-pointer"
                  onClick={showDropDownProjects}
                />
              </IconContext.Provider>
            </div>
            <h1 className="ml-3 text-center font-bold text-xl">Projects</h1>
          </div>
          <AddProject
            customerEntry={props.customerEntry}
            currentCustomerId={props.currentCustomerId}
          />
        </div>
      ) : (
        <div className="flex flex-row ml-3 mr-3 items-center justify-between">
          <div className="flex flex-row items-center">
            <div>
              <IconContext.Provider value={{ size: "2em" }}>
                <AiOutlineDownCircle
                  className="mr-3 cursor-pointer"
                  onClick={showDropDownProjects}
                />
              </IconContext.Provider>
            </div>
            <h1 className="text-center font-bold text-xl">Projects</h1>
          </div>
          <AddProject
            customerEntry={props.customerEntry}
            currentCustomerId={props.currentCustomerId}
          />
        </div>
      )}

      {dropDownProjects &&
        props.customerEntry.projects.map((projectEntry) => (
          <div
            key={projectEntry.projectId}
            className="flex flex-row w-full rounded border border-black p-3 mt-3 bg-gray-400"
          >
            <div className="w-2/6">
              <h1 className="font-bold">Project-Information</h1>
              <div>Project-ID:&nbsp;{projectEntry.projectId}</div>
              <div>Project-Name:&nbsp;{projectEntry.projectName}</div>
              <div>Project-Status:&nbsp;{projectEntry.projectStatus}</div>
              <div className="flex flex-row mt-3">
                <EditProject
                  currentCustomerId={props.currentCustomerId}
                  currentProjectId={projectEntry.projectId}
                  currentProjectName={projectEntry.projectName}
                />
                <DeleteProject
                  currentCustomerId={props.currentCustomerId}
                  currentProjectId={projectEntry.projectId}
                />
              </div>
            </div>
            <div className="w-4/6">
              <h1 className="font-bold">Task-Information</h1>
              <Task
                currentProjectId={projectEntry.projectId}
                projectEntry={projectEntry}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Project;
