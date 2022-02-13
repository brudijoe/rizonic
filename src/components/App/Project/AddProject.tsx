import { useState } from "react";
import { projectAdded } from "../../../redux/dataSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";

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

const AddProject = (props: Props) => {
  const dispatch = useAppDispatch();

  const [projectName, setProjectName] = useState<string>("");
  const onProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);

  const currentCustomerIdProps = props.currentCustomerId;

  const projects = props.customerEntry.projects;
  const lastProjectId =
    props.customerEntry.projects[projects.length - 1].projectId;

  const onAddProjectClicked = async () => {
    if (projectName.length > 1) {
      try {
        const resultAction = await dispatch(
          projectAdded({
            currentCustomerIdProps,
            projectId: lastProjectId + 1,
            projectName,
            projectStatus: currentProjectStatus,
          })
        );
        unwrapResult(resultAction);
        setProjectName("");
      } catch (err) {
        console.error("Failed to add new project: ", err);
      }
    }
  };

  const [modal, setModal] = useState(false);
  const handleModalClicked = () => {
    setModal(!modal);
  };

  const projectStatus = ["", "In progress", "On hold", "Done"];
  const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("");

  const handleNewProjectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProjectStatus(e.currentTarget.value);
  };

  return (
    <div className="">
      {modal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border border-black p-3 bg-green-500">
          <div className="flex flex-row justify-between items-center">
            <div className="invisible pr-3">&nbsp;</div>
            <h1 className="text-center" data-cy="add-project-h1">
              Add Project
            </h1>
            <div className="pl-3">
              <IconContext.Provider value={{ size: "1.25em" }}>
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={handleModalClicked}
                  data-cy="add-project-close"
                />
              </IconContext.Provider>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex">
              <div className="w-3/6">Project-Name:</div>
              <div className="w-3/6">
                <input
                  maxLength={100}
                  className="w-full h-7 mb-3 p-3 rounded border border-black box-border resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  value={projectName}
                  onChange={onProjectNameChanged}
                  autoFocus
                  data-cy="add-project-input"
                />
              </div>
            </div>
            <div className="flex mb-3">
              <div className="w-3/6">Project-Status:</div>
              <div className="w-3/6">
                <select
                  className="w-full h-7 rounded"
                  name="projectstatus"
                  id="projectstatus"
                  onChange={handleNewProjectStatus}
                  data-cy="add-project-select"
                >
                  <option value={projectStatus[0]}>{projectStatus[0]}</option>
                  <option value={projectStatus[1]}>{projectStatus[1]}</option>
                  <option value={projectStatus[2]}>{projectStatus[2]}</option>
                  <option value={projectStatus[3]}>{projectStatus[3]}</option>
                </select>
              </div>
            </div>
            <div className="flex">
              <div className="w-3/6 invisible"></div>
              <button
                type="button"
                className="w-3/6 h-7 rounded bg-green-600 border-black border hover:bg-green-300"
                onClick={onAddProjectClicked}
                data-cy="add-project-button"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
      <IconContext.Provider value={{ size: "2em", color: "#15803d" }}>
        <AiOutlinePlusCircle
          className="cursor-pointer"
          onClick={handleModalClicked}
          data-cy="add-project-icon"
        />
      </IconContext.Provider>
    </div>
  );
};

export default AddProject;
