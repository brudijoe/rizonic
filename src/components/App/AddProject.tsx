import { useState } from "react";
import { projectAdded } from "../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
}

const AddProject = (props: Props) => {
  const dispatch = useAppDispatch();

  const [projectName, setProjectName] = useState<string>("");
  const onProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);

  const currentCustomerIdProps = props.currentCustomerId;
  const projects = useAppSelector(
    (state) =>
      state.data.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      ).projects
  );
  const lastProjectId = useAppSelector(
    (state) =>
      state.data.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      ).projects[projects.length - 1].projectId
  );

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const projectStatus = ["", "In progress", "On hold", "Done"];
  const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("");

  const handleNewProjectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProjectStatus(e.currentTarget.value);
  };

  return (
    <div className="">
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={openModal}
          >
            Add Project
          </button>
        )}
      </div>

      <div>
        {modalIsOpen ? (
          <div className="border border-black p-3 bg-blue-300">
            <div className="flex flex-row justify-between">
              <div className="invisible">Hidden</div>
              <h1 className="text-center">Add Project?</h1>
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
                    className="w-full mb-3 p-3 bg-gray-200 border-gray-500 border box-border resize-y h-7 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    value={projectName}
                    onChange={onProjectNameChanged}
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
                  onClick={onAddProjectClicked}
                >
                  Add Project
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

export default AddProject;