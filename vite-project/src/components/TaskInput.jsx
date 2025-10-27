import { useState } from "react";
import { useTodos } from "../TodoContext";

export function TaskInput({ edit, setEdit }) {
  const { addTodo, updateTodo, resetTodos } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleSave = () => {
    if (newTodo.trim() === "") return;
    if (edit) {
      updateTodo(edit, newTodo);
      setEdit(null);
    } else {
      addTodo(newTodo);
    }
    setNewTodo("");
  };

  return (
    <div className="input-btn">
      <input
        placeholder="what do you want to do"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="button" onClick={handleSave}>
        {edit ? "update" : "save"}
      </button>
      <button
        className="button reset"
        onClick={() => {
          resetTodos();
          setNewTodo("");
          setEdit(null);
        }}
      >
        reset
      </button>
    </div>
  );
}
