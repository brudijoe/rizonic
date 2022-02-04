import { useState } from "react";
import { customerAdded } from "../../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";

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

  const [modal, setModal] = useState(false);
  const handleModalClicked = () => {
    setModal(!modal);
  };

  return (
    <div className="">
      {modal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border border-black p-3 bg-green-500">
          <div className="flex flex-row justify-between items-center">
            <div className="invisible pr-3">&nbsp;</div>
            <h1 className="text-center">Add Customer</h1>
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
            <div className="w-3/6">Customer-Name:</div>
            <div className="w-3/6">
              <input
                className="w-full h-7 mb-3 p-3 rounded border border-black box-border resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                onChange={onCustomerNameChanged}
                value={customerName}
                minLength={2}
                maxLength={100}
                autoFocus
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
      )}
      <IconContext.Provider value={{ size: "2em" }}>
        <AiOutlinePlusCircle
          className="cursor-pointer"
          onClick={handleModalClicked}
        />
      </IconContext.Provider>
    </div>
  );
};

export default AddCustomer;
