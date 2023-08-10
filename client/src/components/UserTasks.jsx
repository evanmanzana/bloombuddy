import React, { useState, useEffect } from "react";

function UserTasks({ currentUser }) {
  const [userTasks, setUserTasks] = useState([]);

  const fetchUserTasks = () => {
    if (currentUser) {
      fetch(`/api/user/${currentUser.id}/tasks`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user tasks.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched user tasks:", data.tasks);
          setUserTasks(data.tasks);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, [currentUser]);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Task deleted successfully.");
        // Refresh tasks
        fetchUserTasks();
      } else {
        const data = await response.json();
        console.error("Error deleting task:", data.error);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex items-center justify-center font-ibarra">
      <div>
        <h2 className="text-4xl text-green-800 flex justify-center pb-2">
          Your Buddies
        </h2>
        {userTasks.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 p-6 justify-center">
            {userTasks.map((task) => (
              <div className="grid grid-cols-1 rounded-md" key={task.task_id}>
                <p>Task: {task.name}</p>
                <p>Description: {task.desc}</p>
                <p>Due Date: {task.due_date}</p>
                <p>
                  Completed? {task.completed ? <p>All done!</p> : <p>Nope!</p>}
                </p>
                <button onClick={() => handleDeleteTask(task.task_id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default UserTasks;
