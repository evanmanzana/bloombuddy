import React, { useEffect, useState } from "react";

function TaskCard({ currentUser }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API based on the currentUser.id
    fetch(`/api/user/${currentUser.id}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [currentUser.id]);

  return (
    <div className="task-page">
      <h1>Your Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id}>
              <h2>{task.name}</h2>
              <p>{task.desc}</p>
              {task.completed ? <p>Completed</p> : <p>Not completed</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskCard;
