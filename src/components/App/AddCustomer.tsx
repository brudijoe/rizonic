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

  const [customerID, setCustomerID] = useState<number>(0);

  // useSelector get last customerID
  const customers = useAppSelector((state) => state.data.customers);
  const lastCustomerID = useAppSelector(
    (state) => state.data.customers[customers.length - 1].customerId
  );
  // console.log("lastCustomerID: ", lastCustomerID);

  const onAddCustomerClicked = async () => {
    if (customerName.length > 1) {
      try {
        const resultAction = await dispatch(
          customerAdded({
            customerId: lastCustomerID + 1,
            customerName: customerName,
            projects: [
              {
                projectId: 1,
                projectName: "",
              },
            ],
          })
        );
        unwrapResult(resultAction);
        setCustomerName("");
      } catch (err) {
        console.error("Failed to add new customer: ", err);
      }
      setCustomerID(customerID + 1);
    }
  };

  // Modal
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
            className="w-full h-7 bg-green-500 border-black border hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={openModal}
          >
            New Customer
          </button>
        )}
      </div>

      <div>
        {modalIsOpen ? (
          <div className="border border-black p-3 bg-blue-300">
            <div className="flex flex-row justify-between">
              <div className="invisible">Hidden</div>
              <h1 className="text-center">New Customer?</h1>
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
                  className="w-full mb-2 p-1 h-7 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-500 border"
                  onChange={onCustomerNameChanged}
                  data-test-id="CustomersInput"
                  value={customerName}
                  minLength={2}
                  maxLength={100}
                />
                <button
                  type="button"
                  className="w-full h-7 bg-green-500 border-black border hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={onAddCustomerClicked}
                  data-test-id="CustomersAddButton"
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
