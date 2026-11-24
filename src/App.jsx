import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";
import "./App.css";

const STORAGE_KEY = "taskflow:tasks:v2";
const FILTERS = ["all", "active", "completed"];

const STARTER_TASKS = [
  { id: 1, title: "Finish React Router practice", priority: "high", completed: false },
  { id: 2, title: "Push TaskFlow to GitHub", priority: "medium", completed: false },
  { id: 3, title: "Apply to 10 frontend roles", priority: "high", completed: false },
  { id: 4, title: "Practice closures and promises", priority: "medium", completed: true },
];

// Read saved tasks once, when the app first loads.
function getInitialTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : STARTER_TASKS;
  } catch {
    return STARTER_TASKS;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  // Save to localStorage whenever tasks change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) =>
    setTasks((prev) => [{ ...task, id: Date.now(), completed: false }, ...prev]);
  const updateTask = (id, changes) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  // Derived data: no extra state needed.
  const visibleTasks = useMemo(
    () =>
      tasks
        .filter((t) => filter === "all" || (filter === "completed" ? t.completed : !t.completed))
        .filter((t) => t.title.toLowerCase().includes(query.trim().toLowerCase())),
    [tasks, filter, query]
  );
  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <header>
        <h1>TaskFlow</h1>
        <p className="sub">{remaining} of {tasks.length} tasks left</p>
      </header>

      <TaskForm onSubmit={addTask} submitLabel="Add task" />

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search tasks"
          aria-label="Search tasks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filters" role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? "chip active" : "chip"} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {visibleTasks.length === 0 && (
        <p className="note">No tasks match. Add one above or change the filter.</p>
      )}

      <ul className="list">
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
        ))}
      </ul>
    </main>
  );
}
