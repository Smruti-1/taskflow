import { useState } from "react";

// Reusable for both "add" and "edit": pass initial values to edit.
export default function TaskForm({ onSubmit, onCancel, initial, submitLabel }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [priority, setPriority] = useState(initial?.priority ?? "medium");
  const [error, setError] = useState("");

  const validate = (value) => {
    const v = value.trim();
    if (!v) return "Enter a task title.";
    if (v.length < 3) return "Title must be at least 3 characters.";
    if (v.length > 80) return "Title must be 80 characters or fewer.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = validate(title);
    if (message) return setError(message);
    onSubmit({ title: title.trim(), priority });
    if (!initial) setTitle(""); // clear only after adding
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); if (error) setError(""); }}
          placeholder="What needs doing?"
          aria-label="Task title"
          aria-invalid={Boolean(error)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="primary">{submitLabel}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </form>
  );
}
