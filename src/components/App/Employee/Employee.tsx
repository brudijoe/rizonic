import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FcSearch } from "react-icons/fc";

const Employee = () => {
  const employees = [
    { id: "1", name: "Ingo" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Inga" },
  ];

  const [query, setQuery] = useState<string>("");

  const onQueryChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setQuery(e.currentTarget.value);

  const filterEmployees = (employees: any[], query: string) => {
    if (!query) {
      return employees;
    }

    return employees.filter((employeesEntry) => {
      const employeeName = employeesEntry.name.toLowerCase();
      return employeeName.includes(query.toLowerCase().trim());
    });
  };

  const filteredEmployees = filterEmployees(employees, query);

  return (
    <div className="w-10/12 h-full min-h-screen bg-gray-800 p-3">
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
        {filteredEmployees.map((employeesEntry) => (
          <div className="bg-gray-300 p-3 m-3 rounded" key={employeesEntry.id}>
            <div data-cy="customer-id">
              Employee-ID:&nbsp;{employeesEntry.id}
            </div>
            <div data-cy="customer-name">
              Employee-Name:&nbsp;{employeesEntry.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
