import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import AddProject from "./AddProject";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";

interface Props {
  currentCustomerId: number;
  customerEntry: {
    customerId: number;
    customerName: string;
    projects: {
      projectId: number;
      projectName: string;
      projectStatus: string;
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
    <div>
      {dropDownProjects ? (
        <div className="flex flex-row mb-3 items-center">
          <div>
            <IconContext.Provider value={{ size: "3em" }}>
              <AiOutlineUpCircle
                className="mr-3 pl-3 cursor-pointer"
                onClick={showDropDownProjects}
              />
            </IconContext.Provider>
          </div>
          <h1 className="text-center font-bold text-xl">Projects</h1>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <div>
            <IconContext.Provider value={{ size: "3em" }}>
              <AiOutlineDownCircle
                className="mr-3 pl-3 cursor-pointer"
                onClick={showDropDownProjects}
              />
            </IconContext.Provider>
          </div>
          <h1 className="text-center font-bold text-xl">Projects</h1>
        </div>
      )}

      {dropDownProjects &&
        props.customerEntry.projects.map((projectEntry) => (
          <div
            key={projectEntry.projectId}
            className="w-full rounded border border-black p-3 mb-3 bg-green-600"
          >
            <div>
              <h1 className="font-bold">Project-Information</h1>
              <div>Project-ID:&nbsp;{projectEntry.projectId}</div>
              <div>Project-Name:&nbsp;{projectEntry.projectName}</div>
              <div>Project-Status:&nbsp;{projectEntry.projectStatus}</div>
              <div className="flex flex-row mt-3">
                <div className="w-2/6 mr-3">
                  <AddProject
                    currentCustomerId={props.currentCustomerId}
                    currentProjectId={projectEntry.projectId}
                  />
                </div>
                <div className="w-2/6 mr-3">
                  <EditProject
                    currentCustomerId={props.currentCustomerId}
                    currentProjectId={projectEntry.projectId}
                    currentProjectName={projectEntry.projectName}
                  />
                </div>
                <div className="w-2/6">
                  <DeleteProject
                    currentCustomerId={props.currentCustomerId}
                    currentProjectId={projectEntry.projectId}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Project;
