import { useState, useEffect } from "react";
import { projectDeleted } from "../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
}

const DeleteProject = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;

  const projectsRedux = useAppSelector(
    (state) =>
      state.data.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      )?.projects
  );

  const [projects, setProjects] = useState(projectsRedux);

  useEffect(() => {
    setProjects(projectsRedux);
  }, [projectsRedux]);

  const handleProjectDeletedYes = async () => {
    // Can't delete if only 1 project is remaining
    if ((projects?.length as number) > 1) {
      try {
        const resultAction = await dispatch(
          projectDeleted({
            currentCustomerIdProps,
            currentProjectIdProps,
            projects: projects,
          })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to delete project: ", err);
      }
    }
    setModalIsOpen(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = async () => {
    setModalIsOpen(false);
  };
  const openModal = async () => {
    setModalIsOpen(true);
  };

  return (
    <div>
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 bg-red-500 border-black border hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={openModal}
          >
            Delete Project
          </button>
        )}
      </div>

      {modalIsOpen ? (
        <div className="border border-black p-3 bg-blue-300">
          <div className="flex flex-row justify-between">
            <div className="invisible">Hidden</div>
            <h1 className="text-center">Delete Project?</h1>
            <div>
              <IconContext.Provider value={{ size: "1.25em" }}>
                <AiOutlineClose
                  className="cursor-pointer mr-3"
                  onClick={closeModal}
                />
              </IconContext.Provider>
            </div>
          </div>
          <div className="flex flex-row p-3">
            <button
              type="button"
              className="w-full h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleProjectDeletedYes}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden">Modal is closed</div>
      )}
    </div>
  );
};

export default DeleteProject;
