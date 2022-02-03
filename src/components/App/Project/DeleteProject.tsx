import { useState, useEffect } from "react";
import { projectDeleted } from "../../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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
    setModal(!modal);
  };

  const [modal, setModal] = useState(false);
  const handleModalClicked = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div>
        {modal && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border border-black p-3 bg-red-500">
            <div className="flex flex-row justify-between items-center">
              <div className="invisible pr-3">&nbsp;</div>
              <h1 className="text-center">Delete Project</h1>
              <div className="pl-3">
                <IconContext.Provider value={{ size: "1.25em" }}>
                  <AiOutlineClose
                    className="cursor-pointer"
                    onClick={handleModalClicked}
                  />
                </IconContext.Provider>
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <button
                type="button"
                className="w-full h-7 rounded bg-red-600 border-black border hover:bg-red-300 "
                onClick={handleProjectDeletedYes}
              >
                Yes
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          className="w-full pl-3 pr-3 h-7 flex items-center justify-center rounded bg-red-500 border-black border hover:bg-red-300 "
          onClick={handleModalClicked}
        >
          <IconContext.Provider value={{ size: "1.25em" }}>
            <MdDelete />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default DeleteProject;
