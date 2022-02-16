import React from "react";
// React Router
import { NavLink } from "react-router-dom";
// React Icons
import { IconContext } from "react-icons";
import { FcBusinessman, FcManager } from "react-icons/fc";

const SideBar = () => {
  return (
    <div className="w-2/12 h-screen sticky top-0 bg-gray-100">
      <div className="flex flex-col items-center h-screen py-5">
        <div className="text-center mb-5 p-5">
          <div className="text-4xl font-bold">Rizonic</div>
          <div className="font-bold">Customer Management</div>
        </div>
        <div className="w-full">
          <NavLink
            className="flex flex-col items-center justify-center text-3xl text-center p-5 hover:bg-gray-400"
            to="/customers"
            data-cy="sidebar-customers-icon"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#D1D5DB" : "",
              };
            }}
          >
            <IconContext.Provider
              value={{ size: "2em", className: "global-class-name" }}
            >
              <FcBusinessman />
            </IconContext.Provider>
            Customers
          </NavLink>
          <NavLink
            className="flex flex-col items-center justify-center text-3xl text-center p-5 hover:bg-gray-400"
            to="/employees"
            data-cy="sidebar-employees-icon"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#D1D5DB" : "",
              };
            }}
          >
            <IconContext.Provider
              value={{ size: "2em", className: "global-class-name" }}
            >
              <FcManager />
            </IconContext.Provider>
            Employees
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;