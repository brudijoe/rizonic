import { useState } from "react";
import { customerDeleted } from "../../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

interface Props {
  currentCustomerId: number;
}

const DeleteCustomer = (props: Props) => {
  const dispatch = useAppDispatch();

  const customersRedux = useAppSelector((state) => state.data.customers);
  const currentCustomerIdProps = props.currentCustomerId;

  const handleCustomerDeletedYes = async () => {
    // Can't delete if only 1 customer is remaining
    if (customersRedux.length > 1) {
      try {
        const resultAction = await dispatch(
          customerDeleted({ currentCustomerIdProps, customers: customersRedux })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to delete customer: ", err);
      }
    }
    setModal(!modal);
  };

  const [modal, setModal] = useState(false);
  const handleModalClicked = () => {
    setModal(!modal);
  };

  return (
    <div className="">
      {modal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded border border-black p-3 bg-red-500">
          <div className="flex flex-row justify-between items-center">
            <div className="invisible pr-3">&nbsp;</div>
            <h1 className="text-center">Delete Customer</h1>
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
              className="w-full rounded h-7 bg-red-600 border-black border hover:bg-red-300"
              onClick={handleCustomerDeletedYes}
            >
              Yes
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        className="w-full pl-3 pr-3  h-7 flex items-center justify-center rounded bg-red-500 border-black border hover:bg-red-300"
        onClick={handleModalClicked}
      >
        <IconContext.Provider value={{ size: "1.25em" }}>
          <MdDelete />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default DeleteCustomer;
