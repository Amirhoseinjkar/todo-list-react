import { useState, useEffect } from "react";
import { useTodos } from "./TodoContext";
import { TaskInput } from "./components/TaskInput";
import { TodoList } from "./components/TodoList";
import { SearchBar } from "./components/SearchBar";
import { DeleteModal } from "./components/DeleteModal";
import "./todoContainer.css";

export function TodoContainer() {
  const { todos, deleteTodo, toggleActive } = useTodos();
  const [edit, setEdit] = useState(null);
  const [searchBar, setSearchBar] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortMode, setSortMode] = useState("newest");

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteTodo(itemToDelete);
    setItemToDelete(null);
    setIsModalOpen(false);
  };

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortMode) {
      case "oldest":
        return a.createdAt - b.createdAt;
      case "alphabet":
        return a.text.localeCompare(b.text);
      default:
        return b.createdAt - a.createdAt;
    }
  });

  return (
    <div className="container">
      <TaskInput edit={edit} setEdit={setEdit} />

      <div className="task-manager">
        <p className="done">
          done tasks: {todos.filter((t) => t.active).length}
        </p>
        <p className="active">active tasks: {todos.length}</p>
      </div>

      <div className="content">
        <div className="sort">
          <select
            name="sort"
            id="sort"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="alphabet">alphabet</option>
          </select>
        </div>

        <TodoList
          todos={sortedTodos}
          toggleActive={toggleActive}
          onEdit={setEdit}
          onDelete={handleDelete}
        />
      </div>

      <SearchBar
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        setFilteredTodos={setFilteredTodos}
      />

      <DeleteModal
        isOpen={isModalOpen}
        onYes={confirmDelete}
        onNo={() => setIsModalOpen(false)}
      />
    </div>
  );
}
