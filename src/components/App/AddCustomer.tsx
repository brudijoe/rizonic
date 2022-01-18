import { useState } from "react";
import { customerAdded } from "../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const AddCustomer = () => {
  const dispatch = useAppDispatch();
  const [customerName, setCustomerName] = useState<string>("");
  const onCustomerNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setCustomerName(e.currentTarget.value);

  const customers = useAppSelector((state) => state.data.customers);
  const lastCustomerId = useAppSelector(
    (state) => state.data.customers[customers.length - 1].customerId
  );

  const onAddCustomerClicked = async () => {
    if (customerName.length > 1) {
      try {
        const resultAction = await dispatch(
          customerAdded({
            customerId: lastCustomerId + 1,
            customerName: customerName,
            projects: [
              {
                projectId: 1,
                projectName: "",
                projectStatus: "",
              },
            ],
          })
        );
        unwrapResult(resultAction);
        setCustomerName("");
      } catch (err) {
        console.error("Failed to add new customer: ", err);
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

  return (
    <div className="">
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 rounded bg-green-500 border-black border hover:bg-green-300 "
            onClick={openModal}
          >
            Add Customer
          </button>
        )}
      </div>

      <div>
        {modalIsOpen ? (
          <div className="rounded border border-black p-3 bg-green-500">
            <div className="flex flex-row justify-between">
              <div className="invisible">Hidden</div>
              <h1 className="text-center">Add Customer?</h1>
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
              <div className="w-3/6">Customer-Name:</div>
              <div className="w-3/6">
                <input
                  className="w-full h-7 mb-3 p-3 rounded border border-black box-border resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  onChange={onCustomerNameChanged}
                  value={customerName}
                  minLength={2}
                  maxLength={100}
                />
                <button
                  type="button"
                  className="w-full h-7 rounded bg-green-600 border-black border hover:bg-green-300 "
                  onClick={onAddCustomerClicked}
                >
                  Add Customer
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

export default AddCustomer;
