import React from "react";

const FilterBar = ({ filter, setFilter, gradeLevels }) => {
  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Filter Employees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nameFilter"
          >
            By Name
          </label>
          <input
            type="text"
            id="nameFilter"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            placeholder="Search by name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gradeLevelFilter"
          >
            By Grade Level
          </label>
          <select
            id="gradeLevelFilter"
            name="gradeLevel"
            value={filter.gradeLevel}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All Grade Levels</option>
            {gradeLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
