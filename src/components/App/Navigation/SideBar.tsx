import React from "react";
// React Router
import { NavLink } from "react-router-dom";
// React Icons
import { IconContext } from "react-icons";
import { FcBusinessman, FcManager, FcStatistics } from "react-icons/fc";

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
            className="flex flex-col items-center justify-center text-3xl text-center p-5 hover:bg-gray-500"
            to="/customers"
            data-cy="sidebar-customers-icon"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#9CA3AF" : "",
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
            className="flex flex-col items-center justify-center text-3xl text-center p-5 hover:bg-gray-500"
            to="/employees"
            data-cy="sidebar-employees-icon"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#9CA3AF" : "",
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
          <NavLink
            className="flex flex-col items-center justify-center text-3xl text-center p-5 hover:bg-gray-500"
            to="/statistics"
            data-cy="sidebar-statistics-icon"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#9CA3AF" : "",
              };
            }}
          >
            <IconContext.Provider
              value={{ size: "2em", className: "global-class-name" }}
            >
              <FcStatistics />
            </IconContext.Provider>
            Statistics
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
