import { useState } from "react";
import { projectEdited } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  currentCustomerId: number;
  currentProjectId: number;
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
          })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to edit project: ", err);
      }
      setProjectName("");
      setModalIsOpen(false);
    }
  };

  const onEditProjectClicked = async () => {
    setModalIsOpen(true);
  };

  // Projectname
  const [projectName, setProjectName] = useState<string>("");
  const handleProjectNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setProjectName(e.currentTarget.value);

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
            <div className="flex flex-row p-3">
              <div className="w-3/6">Project-Name:</div>
              <div className="w-3/6">
                <input
                  maxLength={100}
                  className="w-full mb-3 p-3 bg-gray-200 border-gray-500 border box-border resize-y h-7 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  value={projectName}
                  onChange={handleProjectNameChanged}
                />
                <button
                  type="button"
                  className="w-full h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleProjectEdited}
                >
                  Change Name
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
