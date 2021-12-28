import { useState, useEffect } from "react";
import DeleteCustomer from "./DeleteCustomer";
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
        {customers.map((customerEntry, index) => (
          <div
            className="border border-black m-3 p-3 bg-yellow-300"
            key={index}
          >
            <div>Customer-ID:&nbsp;{customerEntry.customerId}</div>
            <div>Customer-Name:&nbsp;{customerEntry.customerName}</div>
            <div>
              <DeleteCustomer currentCustomerId={customerEntry.customerId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
