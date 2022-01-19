import { useState } from "react";
import { projectEdited } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

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
      setModalIsOpen(false);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = async () => {
    setModalIsOpen(true);
  };
  const closeModal = async () => {
    setModalIsOpen(false);
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
    <div>
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 rounded border border-black bg-blue-500 hover:bg-blue-300 "
            onClick={openModal}
          >
            Edit Project
          </button>
        )}
      </div>
      <div>
        {modalIsOpen ? (
          <div className="p-3 rounded border border-black bg-blue-500">
            <div className="flex flex-row justify-between items-center">
              <div className="invisible">Hidden</div>
              <h1 className="text-center">Edit Project</h1>
              <div>
                <IconContext.Provider value={{ size: "1.25em" }}>
                  <AiOutlineClose
                    className="cursor-pointer mr-3"
                    onClick={closeModal}
                  />
                </IconContext.Provider>
              </div>
            </div>
            <div className="flex flex-col p-3">
              <div className="flex">
                <div className="w-3/6">Project-Name:</div>
                <div className="w-3/6">
                  <input
                    maxLength={100}
                    className="w-full h-7 mb-3 p-3 rounded border border-black box-border resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    value={projectName}
                    onChange={handleProjectNameChanged}
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
        ) : (
          <div className="hidden">Modal is closed</div>
        )}
      </div>
    </div>
  );
};

export default EditProject;
