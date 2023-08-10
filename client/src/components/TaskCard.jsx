import React, { useEffect, useState } from "react";
import { format } from "date-fns"; // Import the correct function

function TaskCard({ currentUser }) {
  const [tasks, setTasks] = useState([]); // Define the tasks state

  useEffect(() => {
    // Fetch tasks from the API based on the currentUser.id
    fetch(`/api/user/${currentUser.id}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks.filter((task) => task.due_date));
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [currentUser.id]);

  return (
    <div className="">
      <h1>Your Tasks</h1>
      {tasks.length === 0 ? (
        <p className="flex justify-center text-4xl pt-6">
          Looks like you don't have a collection yet!
        </p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id}>
              {task.plant_name && <h2>{task.plant_name}</h2>}
              {!task.plant_name && <h2>{task.name}</h2>}
              <p>{task.desc}</p>
              {task.due_date && (
                <p>Due date: {format(new Date(task.due_date), "yyyy-MM-dd")}</p>
              )}
              {task.completed ? <p>Completed</p> : <p>Not completed</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskCard;
