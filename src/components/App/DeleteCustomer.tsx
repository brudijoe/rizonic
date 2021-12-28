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

  // State for Modal if delete is okay
  const [isDelete, setIsDelete] = useState(false);

  const onDeleteCustomerClicked = async () => {
    // if Delete Modul accepted?
    try {
      const resultAction = await dispatch(
        customerDeleted({ currentCustomerIdProps, customers: customersRedux })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.error("Failed to delete customer: ", err);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="w-full h-7 bg-red-500 border-black border hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={onDeleteCustomerClicked}
        data-test-id="CustomersDeleteButton"
      >
        Delete Customer
      </button>
    </div>
  );
};

export default DeleteCustomer;
