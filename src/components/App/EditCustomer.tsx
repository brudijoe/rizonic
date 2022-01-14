import { useState } from "react";
import { customerEdited } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  currentCustomerId: number;
}

const EditCustomer = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCustomerEdited = async () => {
    if (customerName.length > 0) {
      try {
        const resultAction = await dispatch(
          customerEdited({
            currentCustomerIdProps,
            customerName,
          })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to edit customer: ", err);
      }
      setCustomerName("");
      setModalIsOpen(false);
    }
  };

  const onEditCustomerClicked = async () => {
    setModalIsOpen(true);
  };

  // CustomerName
  const [customerName, setCustomerName] = useState<string>("");
  console.log(customerName);

  const handleCustomerNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setCustomerName(e.currentTarget.value);

  return (
    <div className="">
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 bg-blue-500 border-black border hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onEditCustomerClicked}
          >
            Edit Customer
          </button>
        )}
      </div>
      <div>
        {modalIsOpen ? (
          <div className="border border-black p-3 bg-blue-300">
            <h1 className="text-center">Edit Customer?</h1>
            <div className="flex flex-row p-3">
              <div className="w-3/6">Customer-Name:</div>
              <div className="w-3/6">
                <input
                  maxLength={100}
                  className="w-full mb-3 p-3 bg-gray-200 border-gray-500 border box-border resize-y h-7 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  value={customerName}
                  onChange={handleCustomerNameChanged}
                />
                <button
                  type="button"
                  className="w-full h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleCustomerEdited}
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

export default EditCustomer;
