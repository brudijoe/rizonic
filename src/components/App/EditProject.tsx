import { useState } from "react";
import { projectEdited } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
  currentProjectName: string;
}

const EditProject = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      setModalIsOpen(false);
    }
  };

  const onEditProjectClicked = async () => {
    setModalIsOpen(true);
  };

  // Project-Name
  const [projectName, setProjectName] = useState<string>(
    props.currentProjectName
  );
  const handleProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);
  // Project-Status
  const projectStatus = ["", "In progress", "On hold", "Done"];
  const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("");

  const handleNewProjectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProjectStatus(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 bg-blue-500 border-black border hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onEditProjectClicked}
          >
            Edit Project
          </button>
        )}
      </div>
      <div>
        {modalIsOpen ? (
          <div className="border border-black p-3 bg-blue-300">
            <h1 className="text-center">Edit Project?</h1>
            <div className="flex flex-col p-3">
              <div className="flex">
                <div className="w-3/6">Project-Name:</div>
                <div className="w-3/6">
                  <input
                    maxLength={100}
                    className="w-full mb-3 p-3 bg-gray-200 border-gray-500 border box-border resize-y h-7 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    value={projectName}
                    onChange={handleProjectNameChanged}
                  />
                </div>
              </div>
              <div className="flex mb-3">
                <div className="w-3/6">Project-Status:</div>
                <div className="w-3/6">
                  <select
                    className="w-full"
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
                  className="w-3/6 h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleProjectEdited}
                >
                  Change Project
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden">Modal is closed</div>
        )}
      </div>
    </div>
  );
};

export default EditProject;
