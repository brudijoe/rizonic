import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
import Project from "../Project/Project";
// Redux
import { useAppSelector } from "../../../redux/hooks";

const Customer = () => {
  const customersRedux = useAppSelector((state) => state.data.customers);
  const [customers, setCustomers] = useState(customersRedux);

  useEffect(() => {
    setCustomers(customersRedux);
  }, [customersRedux]);

  // Dropdown Menu for Customer
  // ! Set to true for Development
  const [dropDownCustomers, setDropDownCustomers] = useState(false);
  const showDropDownCustomers = () => {
    setDropDownCustomers(!dropDownCustomers);
  };

  return (
    <div>
      <div className="bg-gray-100 rounded p-3 border border-black">
        {dropDownCustomers ? (
          <div className="flex flex-row ml-3 mr-3 items-center justify-between">
            <div className="flex flex-row items-center">
              <div>
                <IconContext.Provider value={{ size: "2em" }}>
                  <AiOutlineUpCircle
                    className="cursor-pointer"
                    onClick={showDropDownCustomers}
                    data-cy="close-customer-dropdown"
                  />
                </IconContext.Provider>
              </div>
              <h1 className="ml-3 text-center text-2xl font-bold">Customers</h1>
            </div>
            <AddCustomer />
          </div>
        ) : (
          <div className="flex flex-row ml-3 mr-3 items-center justify-between">
            <div className="flex flex-row items-center">
              <div>
                <IconContext.Provider value={{ size: "2em" }}>
                  <AiOutlineDownCircle
                    className="mr-3 cursor-pointer"
                    onClick={showDropDownCustomers}
                    data-cy="open-customer-dropdown"
                  />
                </IconContext.Provider>
              </div>
              <h1 className="text-center text-2xl font-bold">Customers</h1>
            </div>
            <AddCustomer />
          </div>
        )}
        {dropDownCustomers &&
          customers.map((customerEntry) => (
            <div className="flex" key={customerEntry.customerId}>
              <div className="w-full bg-gray-500 rounded border border-black p-3 mt-3">
                <h1 className="font-bold" data-cy="customer-information">
                  Customer-Information
                </h1>
                <div data-cy="customer-id">
                  Customer-ID:&nbsp;{customerEntry.customerId}
                </div>
                <div data-cy="customer-name">
                  Customer-Name:&nbsp;{customerEntry.customerName}
                </div>
                <div className="flex flex-row mt-3 mb-3">
                  <EditCustomer currentCustomerId={customerEntry.customerId} />
                  <DeleteCustomer
                    currentCustomerId={customerEntry.customerId}
                  />
                </div>
                <Project
                  customerEntry={customerEntry}
                  currentCustomerId={customerEntry.customerId}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Customer;
