import React from "react";
import Customer from "./Customer/Customer";
import Employee from "./Employee/Employee";
import SideBar from "./Navigation/SideBar";
import Statistics from "./Statistics/Statistics";
import New from "./MultiStepper/New";
// React Router
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="flex">
      <SideBar />
      <Routes>
        <Route path="/new" element={<New />} />
        <Route path="/" element={<Navigate replace to="/customers" />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
};

export default App;
