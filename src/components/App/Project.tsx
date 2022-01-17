import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
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
      <h1 className="text-center font-bold text-xl">Projects</h1>
      {dropDownProjects ? (
        <div>
          <IconContext.Provider
            value={{ size: "3em", className: "global-class-name" }}
          >
            <AiOutlineUpCircle
              className="pl-3 cursor-pointer"
              onClick={showDropDownProjects}
            />
          </IconContext.Provider>
        </div>
      ) : (
        <div>
          <IconContext.Provider
            value={{ size: "3em", className: "global-class-name" }}
          >
            <AiOutlineDownCircle
              className="pl-3 cursor-pointer"
              onClick={showDropDownProjects}
            />
          </IconContext.Provider>
        </div>
      )}

      {dropDownProjects &&
        props.customerEntry.projects.map((projectEntry) => (
          <div
            key={projectEntry.projectId}
            className="w-full border border-black p-3 mb-3 bg-green-600"
          >
            <div>
              <h1>Project-Information</h1>
              <div>Project-ID:&nbsp;{projectEntry.projectId}</div>
              <div>Project-Name:&nbsp;{projectEntry.projectName}</div>
              <div>Project-Status:&nbsp;{projectEntry.projectStatus}</div>
              <div className="flex flex-row mt-3">
                <div className="w-3/6 mr-3">
                  <EditProject
                    currentCustomerId={props.currentCustomerId}
                    currentProjectId={projectEntry.projectId}
                    currentProjectName={projectEntry.projectName}
                  />
                </div>
                <div className="w-3/6">
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
