import React from "react";

const EmployeeProfile = ({ employee, onEdit, onClose }) => {
  if (!employee) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Employee Profile</h2>
      <div className="space-y-3">
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Role:</strong> {employee.role}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Address:</strong> {employee.address}
        </p>
        <p>
          <strong>Country:</strong> {employee.country}
        </p>
        <p>
          <strong>State:</strong> {employee.state}
        </p>
        <p>
          <strong>Grade Level:</strong> {employee.gradeLevel || "Not assigned"}
        </p>
      </div>
      <div className="mt-6 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfile;
