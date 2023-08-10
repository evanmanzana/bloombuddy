import React, { useState } from "react";

function AddCareTask({ userPlantId }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescChange = (e) => {
    setTaskDesc(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDueDate = new Date(dueDate).toISOString();

    const taskData = {
      name: taskTitle,
      desc: taskDesc,
      due_date: formattedDueDate,
      user_plant_id: userPlantId,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log("Task created successfully.");
      } else {
        const data = await response.json();
        console.error("Error creating task:", data.error);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data); // Log the error response data for debugging
      }
    }

    setTaskTitle("");
    setTaskDesc("");
    setDueDate("");
  };

  return (
    <div>
      {!isFormVisible ? (
        <div
          className=" hover:underline bg-white  cursor-pointer text-left"
          onClick={() => setIsFormVisible(true)}
        >
          Add a Task?
        </div>
      ) : (
        <div className=" border-b border-gray-300 bg-white ">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Title:</label>
              <input
                type="text"
                value={taskTitle}
                onChange={handleTaskTitleChange}
                className="w-full p-2 border-b border-gray-300 bg-white focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Description:</label>
              <textarea
                value={taskDesc}
                onChange={handleTaskDescChange}
                className="w-full p-2 border-b border-gray-300 bg-white focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Due Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                className="w-full p-2 border-b border-gray-300 bg-white  focus:outline-none focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 m-2 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddCareTask;
