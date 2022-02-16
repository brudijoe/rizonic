import React from "react";
import Customer from "./Customer/Customer";
import Employee from "./Employee/Employee";
import SideBar from "./Navigation/SideBar";
// React Router
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="flex">
      <SideBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/customers" />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/employees" element={<Employee />} />
      </Routes>
    </div>
  );
};

export default App;
