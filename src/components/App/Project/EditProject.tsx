import { useState } from "react";
import { projectEdited } from "../../../redux/dataSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
  currentProjectName: string;
}

const EditProject = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;

  const handleProjectEdited = async () => {
    if (projectName.length > 0) {
      try {
        const resultAction = await dispatch(
          projectEdited({
            currentCustomerIdProps,
            currentProjectIdProps,
            projectName,
            projectStatus: currentProjectStatus,
          })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to edit project: ", err);
      }
      setModal(!modal);
    }
  };

  const [modal, setModal] = useState(false);
  const handleModalClicked = () => {
    setModal(!modal);
  };
  const [projectName, setProjectName] = useState<string>(
    props.currentProjectName
  );
  const handleProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);

  const projectStatus = ["", "In progress", "On hold", "Done"];
  const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("");

  const handleNewProjectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProjectStatus(e.currentTarget.value);
  };

  return (
    <div className="mr-3">
      {modal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded border border-black bg-blue-500">
          <div className="flex flex-row justify-between items-center">
            <div className="invisible pr-3">&nbsp;</div>
            <h1 className="text-center">Edit Project</h1>
            <div className="pl-3">
              <IconContext.Provider value={{ size: "1.25em" }}>
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={handleModalClicked}
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
                  onChange={handleProjectNameChanged}
                  autoFocus
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
                className="w-3/6 h-7 rounded border-black border bg-blue-600 hover:bg-blue-300 "
                onClick={handleProjectEdited}
              >
                Change Project
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        className="w-full pl-3 pr-3 h-7 flex items-center justify-center rounded border border-black bg-blue-500 hover:bg-blue-300 "
        onClick={handleModalClicked}
      >
        <IconContext.Provider value={{ size: "1.25em" }}>
          <GrEdit />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default EditProject;