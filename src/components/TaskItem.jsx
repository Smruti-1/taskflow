import { useState } from "react";
import TaskForm from "./TaskForm.jsx";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="item">
        <TaskForm
          initial={task}
          submitLabel="Save changes"
          onCancel={() => setEditing(false)}
          onSubmit={(changes) => { onUpdate(task.id, changes); setEditing(false); }}
        />
      </li>
    );
  }

  return (
    <li className={task.completed ? "item done" : "item"}>
      <label>
        <input type="checkbox" checked={task.completed} onChange={() => onUpdate(task.id, { completed: !task.completed })} />
        <span className="title">{task.title}</span>
      </label>
      <span className={`badge ${task.priority}`}>{task.priority}</span>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
