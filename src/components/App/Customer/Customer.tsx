import { useState, useEffect } from "react";
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

  return (
    <div className="w-10/12 h-full min-h-screen bg-gray-600 p-3">
      <div className="bg-gray-100 rounded p-3 border border-black">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <h1 className="text-center text-2xl font-bold">Customers</h1>
          </div>
        </div>
        {customers.map((customerEntry) => (
          <div className="flex" key={customerEntry.customerId}>
            <div className="w-full bg-gray-400 rounded border border-black p-3 mt-3">
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
                <DeleteCustomer currentCustomerId={customerEntry.customerId} />
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
