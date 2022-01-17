import { useState, useEffect } from "react";
import { projectDeleted } from "../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
}

const DeleteProject = (props: Props) => {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentCustomerIdProps = props.currentCustomerId;
  const currentProjectIdProps = props.currentProjectId;
  // console.log(currentCustomerIdProps);

  // Müsste index sein und nicht id, alternative wieder .find benutzen
  // const projectsRedux = useAppSelector(
  //   (state) => state.data.customers[0].projects
  // );
  const projectsRedux = useAppSelector(
    (state) =>
      state.data.customers.find(
        (obj) => obj.customerId === currentCustomerIdProps
      )?.projects
  );
  console.log(projectsRedux);

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
  const handleProjectDeletedNo = () => {
    setModalIsOpen(false);
  };

  const onDeleteProjectClicked = async () => {
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
            onClick={onDeleteProjectClicked}
          >
            Delete Project
          </button>
        )}
      </div>

      <div className="flex justify-center">
        {modalIsOpen ? (
          <div className="border border-black p-3 bg-blue-300">
            <h1 className="text-center">Delete Project?</h1>
            <div className="flex flex-row p-3">
              <div className="w-3/6 mr-3">
                <button
                  type="button"
                  className="w-28 h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleProjectDeletedYes}
                >
                  Yes
                </button>
              </div>
              <div className="w-3/6">
                <button
                  type="button"
                  className="w-28 h-7 bg-red-500 border-black border hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleProjectDeletedNo}
                >
                  No
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

export default DeleteProject;
