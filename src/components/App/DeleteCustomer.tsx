import { useState } from "react";
import { customerDeleted } from "../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  currentCustomerId: number;
}

const DeleteCustomer = (props: Props) => {
  const dispatch = useAppDispatch();

  const customersRedux = useAppSelector((state) => state.data.customers);
  const currentCustomerIdProps = props.currentCustomerId;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCustomerDeletedYes = async () => {
    try {
      const resultAction = await dispatch(
        customerDeleted({ currentCustomerIdProps, customers: customersRedux })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.error("Failed to delete customer: ", err);
    }
    setModalIsOpen(false);
  };
  const handleCustomerDeletedNo = () => {
    setModalIsOpen(false);
  };

  const onDeleteCustomerClicked = async () => {
    setModalIsOpen(true);
  };

  const DeleteButton = () => {
    return (
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 bg-red-500 border-black border hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onDeleteCustomerClicked}
            data-test-id="CustomersDeleteButton"
          >
            Delete Customer
          </button>
        )}
      </div>
    );
  };

  const Modal = () => {
    return (
      <div className="flex justify-center ">
        {modalIsOpen ? (
          <div className="border border-black p-3 bg-blue-300">
            <h1 className="text-center">Delete Customer?</h1>
            <div className="flex flex-row p-3">
              <div className="w-3/6 mr-3">
                <button
                  type="button"
                  className="w-28 h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleCustomerDeletedYes}
                >
                  Yes
                </button>
              </div>
              <div className="w-3/6">
                <button
                  type="button"
                  className="w-28 h-7 bg-red-500 border-black border hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleCustomerDeletedNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden">Modal ist geschlossen</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <DeleteButton />
      <Modal />
    </div>
  );
};

export default DeleteCustomer;
