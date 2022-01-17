import { useState } from "react";
import { customerAdded } from "../../redux/dataSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";

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

  return (
    <div className="mb-3 p-6 bg-blue-500 border border-black">
      <input
        className="w-full mb-2 p-1 h-7 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-500 border"
        placeholder="Kundenname"
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
  );
};

export default AddCustomer;
