import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete, onView, onAddNew }) => {
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Employees</h2>
          <button
            onClick={onAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
        </div>
        <div className="p-8 text-center text-gray-500">
          No employees found. Add your first employee!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Employees</h2>
        <button
          onClick={onAddNew}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.gradeLevel || "Not assigned"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onView(employee)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(employee)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
