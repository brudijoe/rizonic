import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
import Project from "./Project";
// Redux
import { useAppSelector } from "../../redux/hooks";

const Customer = () => {
  const customersRedux = useAppSelector((state) => state.data.customers);
  const [customers, setCustomers] = useState(customersRedux);

  useEffect(() => {
    setCustomers(customersRedux);
  }, [customersRedux]);

  // Dropdown Menu for Customer
  // ! Set to true for Development
  const [dropDownCustomers, setDropDownCustomers] = useState(true);
  const showDropDownCustomers = () => {
    setDropDownCustomers(!dropDownCustomers);
  };

  return (
    <div>
      <div className="bg-red-400 rounded p-3 border border-black">
        {dropDownCustomers ? (
          <div className="flex flex-row items-center">
            <div>
              <IconContext.Provider value={{ size: "3em" }}>
                <AiOutlineUpCircle
                  className="mr-3 pl-3 cursor-pointer"
                  onClick={showDropDownCustomers}
                />
              </IconContext.Provider>
            </div>
            <h1 className="text-center text-2xl font-bold">Customers</h1>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <div>
              <IconContext.Provider value={{ size: "3em" }}>
                <AiOutlineDownCircle
                  className="mr-3 pl-3 cursor-pointer"
                  onClick={showDropDownCustomers}
                />
              </IconContext.Provider>
            </div>
            <h1 className="text-center text-2xl font-bold">Customers</h1>
          </div>
        )}
        {dropDownCustomers &&
          customers.map((customerEntry) => (
            <div className="flex" key={customerEntry.customerId}>
              <div className="w-full bg-gray-300 rounded mr-3 border border-black m-3 p-3">
                <h1 className="font-bold">Customer-Information</h1>
                <div>Customer-ID:&nbsp;{customerEntry.customerId}</div>
                <div>Customer-Name:&nbsp;{customerEntry.customerName}</div>
                <div className="flex flex-row mt-3 mb-3">
                  <div className="w-2/6 mr-3">
                    <AddCustomer />
                  </div>
                  <div className="w-2/6 mr-3">
                    <EditCustomer
                      currentCustomerId={customerEntry.customerId}
                    />
                  </div>
                  <div className="w-2/6">
                    <DeleteCustomer
                      currentCustomerId={customerEntry.customerId}
                    />
                  </div>
                </div>
                <div className="w-full rounded border border-black p-3 bg-indigo-300">
                  <Project
                    customerEntry={customerEntry}
                    currentCustomerId={customerEntry.customerId}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Customer;
