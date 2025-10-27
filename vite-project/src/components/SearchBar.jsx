import { useEffect } from "react";
import { useTodos } from "../TodoContext";
export function SearchBar({ searchBar, setSearchBar, setFilteredTodos }) {
  const { todos } = useTodos();

  useEffect(() => {
    if (searchBar.trim() === "") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchBar.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
  }, [searchBar, todos]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search..."
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />
    </div>
  );
}
