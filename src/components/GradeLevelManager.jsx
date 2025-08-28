import React, { useState } from "react";

const GradeLevelManager = ({ gradeLevels, onAdd, onDelete }) => {
  const [newGradeLevel, setNewGradeLevel] = useState("");

  const handleAddGradeLevel = (e) => {
    e.preventDefault();
    if (newGradeLevel.trim() && !gradeLevels.includes(newGradeLevel.trim())) {
      onAdd(newGradeLevel.trim());
      setNewGradeLevel("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Grade Levels</h2>

      <form onSubmit={handleAddGradeLevel} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newGradeLevel}
            onChange={(e) => setNewGradeLevel(e.target.value)}
            placeholder="New grade level (e.g., LVL1)"
            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-2">Existing Grade Levels</h3>
        <ul className="divide-y divide-gray-200">
          {gradeLevels.map((level) => (
            <li key={level} className="py-2 flex justify-between items-center">
              <span>{level}</span>
              <button
                onClick={() => onDelete(level)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </li>
          ))}
          {gradeLevels.length === 0 && (
            <li className="py-2 text-gray-500">No grade levels added yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GradeLevelManager;
