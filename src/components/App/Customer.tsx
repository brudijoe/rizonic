import { useState, useEffect } from "react";
import DeleteCustomer from "./DeleteCustomer";
// Redux
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Customer = () => {
  const customersRedux = useAppSelector((state) => state.data.customers);

  // console.log(customers);

  const [customers, setCustomers] = useState(customersRedux);

  useEffect(() => {
    setCustomers(customersRedux);
  }, [customersRedux]);

  return (
    <div>
      <div className="bg-red-300">
        <h1>Customers</h1>
        {customers.map((customerEntry, index) => (
          <div key={index}>
            <div>
              Customer-ID
              {customerEntry.customerId}
            </div>
            <div>
              Customer-Name
              {customerEntry.customerName}
            </div>
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
