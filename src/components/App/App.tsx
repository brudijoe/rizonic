import React from "react";
import Customer from "./Customer";
import AddCustomer from "./AddCustomer";

const App = () => {
  return (
    <div className="h-screen bg-gray-400">
      <Customer />
      <AddCustomer />
    </div>
  );
};

export default App;
