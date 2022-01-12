import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import DeleteCustomer from "./DeleteCustomer";
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
  const [dropDownCustomers, setDropDownCustomers] = useState(false);
  const showDropDownCustomers = () => {
    setDropDownCustomers(!dropDownCustomers);
  };

  // Dropdown Menu for Projects
  const [dropDownProjects, setDropDownProjects] = useState(false);
  const showDropDownProjects = () => {
    setDropDownProjects(!dropDownProjects);
  };

  return (
    <div>
      <div className="bg-red-200 p-3 mb-3 border border-black">
        <h1 className="text-center text-2xl font-bold">Customers</h1>
        {dropDownCustomers ? (
          <div>
            <IconContext.Provider
              value={{ size: "3em", className: "global-class-name" }}
            >
              <AiOutlineUpCircle
                className="pl-3 cursor-pointer"
                onClick={showDropDownCustomers}
              />
            </IconContext.Provider>
          </div>
        ) : (
          <div>
            <IconContext.Provider
              value={{ size: "3em", className: "global-class-name" }}
            >
              <AiOutlineDownCircle
                className="pl-3 cursor-pointer"
                onClick={showDropDownCustomers}
              />
            </IconContext.Provider>
          </div>
        )}
        {dropDownCustomers &&
          customers.map((customerEntry) => (
            <div
              className="border border-black m-3 p-3 bg-yellow-300"
              key={customerEntry.customerId}
            >
              <div className="flex">
                <div className="w-3/6 mr-3 border border-black m-3 p-3">
                  <h1>Customer-Information</h1>
                  <div>Customer-ID:&nbsp;{customerEntry.customerId}</div>
                  <div>Customer-Name:&nbsp;{customerEntry.customerName}</div>
                  <div className="mt-3">
                    <DeleteCustomer
                      currentCustomerId={customerEntry.customerId}
                    />
                  </div>
                </div>
                <div className="w-3/6 border border-black m-3 p-3 bg-green-500">
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
