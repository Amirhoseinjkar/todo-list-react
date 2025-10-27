import React from "react";

export function TodoList({ todos, toggleActive, onEdit, onDelete }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="empty-task">
        <div className="empty-task-img">
          <img src="/task-analysis.png" width={50} height={50} alt="empty" />
        </div>
        <div>
          right now the task bar is empty <br />
          add some tasks to the list so you can watch what happens
        </div>
      </div>
    );
  }

  return (
    <div className="ul-container">
      <ul>
        {todos.map((todo) => (
          <div className="list" key={todo.id}>
            <span
              className={`circle ${todo.active ? "list-active" : ""}`}
              onClick={() => toggleActive(todo.id)}
            ></span>
            <li className={`li ${todo.active ? "li-active" : ""}`}>
              {todo.text}
            </li>
            <button className="li-btn" onClick={() => onDelete(todo.id)}>
              <img src="/trash.png" alt="trash" width={15} height={15} />
            </button>
            <button className="li-btn" onClick={() => onEdit(todo.id)}>
              <img src="/edit.png" alt="edit" width={15} height={15} />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
