import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeProfile from "./components/EmployeeProfile";
import GradeLevelManager from "./components/GradeLevelManager";
import FilterBar from "./components/FilterBar";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [employees, setEmployees] = useLocalStorage("employees", []);
  const [gradeLevels, setGradeLevels] = useLocalStorage("gradeLevels", []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState({ name: "", gradeLevel: "" });

  // Filter employees based on filter criteria
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = employee.name
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const gradeMatch =
      filter.gradeLevel === "" || employee.gradeLevel === filter.gradeLevel;
    return nameMatch && gradeMatch;
  });

  // CRUD operations for employees
  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
    setIsCreating(false);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // CRUD operations for grade levels
  const addGradeLevel = (gradeLevel) => {
    if (!gradeLevels.includes(gradeLevel)) {
      setGradeLevels([...gradeLevels, gradeLevel]);
    }
  };

  const deleteGradeLevel = (level) => {
    // Remove the grade level from any employees that have it
    setEmployees(
      employees.map((emp) =>
        emp.gradeLevel === level ? { ...emp, gradeLevel: "" } : emp
      )
    );
    setGradeLevels(gradeLevels.filter((gl) => gl !== level));
  };

  const resetView = () => {
    setSelectedEmployee(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Staff Directory banner */}

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white">Staff Directory</h1>
        <p className="text-gray-400 mt-2">
          Manage your organization's employees and their information
        </p>

        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center">
            <span className="text-white font-semibold mr-2">
              {employees.length}
            </span>
            <span className="text-gray-400 text-sm">Employees</span>
          </div>
          <div className="flex items-center">
            <span className="text-white font-semibold mr-2">
              {gradeLevels.length}
            </span>
            <span className="text-gray-400 text-sm">Grade Levels</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            gradeLevels={gradeLevels}
          />

          <EmployeeList
            employees={filteredEmployees}
            onEdit={(employee) => {
              setSelectedEmployee(employee);
              setIsEditing(true);
            }}
            onDelete={deleteEmployee}
            onView={setSelectedEmployee}
            onAddNew={() => setIsCreating(true)}
          />
        </div>

        <div className="lg:col-span-1">
          {isCreating ? (
            <EmployeeForm
              onSubmit={addEmployee}
              onCancel={() => setIsCreating(false)}
              gradeLevels={gradeLevels}
            />
          ) : isEditing ? (
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={updateEmployee}
              onCancel={resetView}
              gradeLevels={gradeLevels}
            />
          ) : selectedEmployee ? (
            <EmployeeProfile
              employee={selectedEmployee}
              onEdit={() => setIsEditing(true)}
              onClose={resetView}
            />
          ) : (
            <GradeLevelManager
              gradeLevels={gradeLevels}
              onAdd={addGradeLevel}
              onDelete={deleteGradeLevel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
