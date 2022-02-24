import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FcSearch } from "react-icons/fc";
// Redux
import { useAppSelector } from "../../../redux/hooks";

interface Employees {
  filter: any;
  employees?: {
    employeeId: number;
    employeeName: string;
    employeeEntryDate: Date;
    employeeDepartment: string;
  }[];
}

interface EmployeeEntry {
  employeeId: number;
  employeeName: string;
  employeeEntryDate: Date;
  employeeDepartment: string;
}

const Employee = () => {
  const employeesRedux = useAppSelector((state) => state.employee.employees);
  const [employees, setEmployees] = useState(employeesRedux);

  useEffect(() => {
    setEmployees(employeesRedux);
  }, [employeesRedux]);

  const [query, setQuery] = useState<string>("");

  const onQueryChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setQuery(e.currentTarget.value);

  const filterEmployees = (employees: Employees, query: string) => {
    if (!query) {
      return employees;
    }

    return employees.filter((employeesEntry: EmployeeEntry) => {
      const employeeName = employeesEntry.employeeName.toLowerCase();
      return employeeName.includes(query.toLowerCase().trim());
    });
  };

  const filteredEmployees = filterEmployees(employees, query);

  return (
    <div className="w-10/12 h-full min-h-screen bg-gray-600 p-3">
      <div className="flex flex-row justify-between p-3 mb-3 bg-gray-100 rounded border border-black">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex flex-row items-center">
          <input
            type="search"
            className="rounded px-3 h-7"
            placeholder="Search Employees..."
            onChange={onQueryChanged}
            value={query}
            data-cy="employee-input-search"
          />
          <IconContext.Provider value={{ size: "1.25em" }}>
            <FcSearch
              className="cursor-pointer ml-1"
              // onClick={}
              data-cy="close-customer-dropdown"
            />
          </IconContext.Provider>
        </div>
      </div>
      <div className="bg-gray-100 rounded p-3 border border-black">
        <h1 className="font-bold" data-cy="employee-information">
          Employee-Information
        </h1>
        {filteredEmployees.map((employeesEntry: EmployeeEntry) => (
          <div
            className="bg-gray-300 p-3 m-3 rounded"
            key={employeesEntry.employeeId}
          >
            <div data-cy="customer-id">
              Employee-ID:&nbsp;{employeesEntry.employeeId}
            </div>
            <div data-cy="customer-name">
              Employee-Name:&nbsp;{employeesEntry.employeeName}
            </div>
            <div data-cy="customer-name">
              Employee-Entry-Date:&nbsp;
              {employeesEntry.employeeEntryDate}
            </div>
            <div data-cy="customer-name">
              Employee-Deparment:&nbsp;
              {employeesEntry.employeeDepartment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
