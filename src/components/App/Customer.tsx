import React from "react";
// Redux
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Customer = () => {
  const customers = useAppSelector((state) => state.data.customers);
  console.log(customers);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
