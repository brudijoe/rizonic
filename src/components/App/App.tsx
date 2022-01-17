import React from "react";
import Customer from "./Customer";
import AddCustomer from "./AddCustomer";

const App = () => {
  return (
    <div className="h-full bg-gray-400 p-3">
      <AddCustomer />
      <Customer />
    </div>
  );
};

export default App;
