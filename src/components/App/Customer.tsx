import { useState, useEffect } from "react";
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

  return (
    <div>
      <div className="bg-red-200 p-3 mb-3 border border-black">
        <h1 className="text-center text-2xl font-bold">Customers</h1>
        {customers.map((customerEntry) => (
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
              {customerEntry.projects.map((projectEntry) => (
                <div
                  key={projectEntry.projectId}
                  className="w-3/6 border border-black m-3 p-3 bg-yellow-400"
                >
                  <Project
                    currentCustomerId={customerEntry.customerId}
                    projectEntry={projectEntry}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
