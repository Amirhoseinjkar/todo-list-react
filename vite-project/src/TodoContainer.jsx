import { useEffect, useState } from "react";
import "./todoContainer.css";

export function TodoContainer() {
  const getSaved = () => {
    const raw = localStorage.getItem("inputValue");
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  // مقدار اولیه هر دو state را از localStorage بخوان
  const [allInputValue, setAllInputValue] = useState(() => getSaved());
  const [sortMode, setSortMode] = useState('newest') 
  const [inputValue, setInputValue] = useState(() => getSaved());

  const [newTodo, setNewTodo] = useState("");
  const [edit, setEdit] = useState(null);
  const [searchBar, setSearchBar] = useState("");
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [itemToDelete,setItemToDelete] = useState();
  // هر بار allInputValue تغییر کرد، در localStorage ذخیره کن
  useEffect(() => {
    localStorage.setItem("inputValue", JSON.stringify(allInputValue));
  }, [allInputValue]);

  // افزودن یا بروزرسانی (edit)
  const btnClick = () => {
    if (newTodo.trim() === "") return;

    if (edit === null) {
      const newItem = { id: crypto.randomUUID(), text: newTodo, active: false, createdAt: Date.now() };
      setAllInputValue((prev) => {
        const next = [...prev, newItem];
        setInputValue(next);
        return next;
      });
      setNewTodo("");
    } else {
      setAllInputValue((prev) => {
        const next = prev.map((it) => (it.id === edit ? { ...it, text: newTodo } : it));
        setInputValue(next);
        return next;
      });
      setNewTodo("");
      setEdit(null);
    }
  };

  // حذف
  const deleteItem = (id) => {
    setIsModalOpen(true)
    setItemToDelete(id)
   /* setAllInputValue((prev) => {
      const next = prev.filter((it) => it.id !== id);
      setInputValue(next);
      
      return next;
    });*/
  };
  const yes = ()=>{
  setInputValue(inputValue.filter(item=> item.id !== itemToDelete))
setIsModalOpen(false);
  setItemToDelete(null);
  }
  const no = ()=>{
    setIsModalOpen(!isModalOpen)
    setItemToDelete(null)
  }

  // toggle done
  const toggleActive = (id) => {
    setAllInputValue((prev) => {
      const next = prev.map((it) => (it.id === id ? { ...it, active: !it.active } : it));
      setInputValue(next);
      return next;
    });
  };

  // edit button: مقدار رو داخل input می‌ریزیم و edit id رو تنظیم می‌کنیم
  const editButton = (id) => {
    const item = allInputValue.find((it) => it.id === id);
    if (!item) return;
    setNewTodo(item.text);
    setEdit(item.id);
  };

  // سرچ (زنده): بر اساس allInputValue فیلتر می‌کنیم
  useEffect(() => {
    const v = searchBar.trim().toLowerCase();
    if (v === "") {
      setInputValue(allInputValue);
    } else {
      setInputValue(allInputValue.filter((it) => it.text.toLowerCase().includes(v)));
    }
  }, [searchBar, allInputValue]);
 const sortedItems = () => {
  const itemsCopy = [...inputValue]; // کپی آرایه
  switch (sortMode) {
    case "oldest":
      return itemsCopy.sort((a,b) => a.createdAt - b.createdAt);
    case "newest":
      return itemsCopy.sort((a,b) => b.createdAt - a.createdAt);
    case "alphabet":
      return itemsCopy.sort((a,b) => a.text.localeCompare(b.text));
    default:
      return itemsCopy;
  }
};
  // render list یا پیام خالی
  const renderList = () => {
    if (!inputValue || inputValue.length === 0) {
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
    {sortedItems().map((input) => (
      <div className="list" key={input.id}>
        <span
          className={`circle ${input.active ? "list-active" : ""}`}
          onClick={() => toggleActive(input.id)}
        ></span>
        <li className={`li ${input.active ? "li-active" : ""}`}>{input.text}</li>
        <button className="li-btn" onClick={() => deleteItem(input.id)}>
          <img src="/trash.png" alt="trash" width={15} height={15} />
        </button>
        <button className="li-btn" onClick={() => editButton(input.id)}>
          <img src="/edit.png" alt="edit" width={15} height={15} />
        </button>
      </div>
    ))}
  </ul>
</div>

    );
  };

 

  return (
    <div className="container">
      <div className="input-btn">
        <input
          placeholder="what do you want to do"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="button" onClick={btnClick}>
          {edit ? "update" : "save"}
        </button>
        <button
          className="button reset"
          onClick={() => {
            setAllInputValue([]);
            setInputValue([]);
            setNewTodo("");
            setEdit(null);
            setSearchBar("");
            localStorage.removeItem("inputValue");
          }}
        >
          reset
        </button>
      </div>

      <div className="task-manager">
        <p className="done">done tasks: {allInputValue.filter((it) => it.active).length}</p>
        <p className="active">active tasks: {allInputValue.length}</p>
      </div>

      <div className="content">
        <div className="sort">
          <select name="sort" id="sort" 
          value={sortMode}
            onChange={(e)=>setSortMode(e.target.value)}
          >
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="alphabet">alphabet</option>
          </select>
        </div>
        {renderList()}
        </div>

      <div className="searchbar">
        <input
          type="search"
          placeholder="what are you looking for"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <button
          onClick={() => {
            // فقط برای دکمه: سرچ همون کاری که سرچ زنده انجام می‌ده
            const v = searchBar.trim().toLowerCase();
            if (v === "") setInputValue(allInputValue);
            else setInputValue(allInputValue.filter((it) => it.text.toLowerCase().includes(v)));
          }}
        >
          <img src="/search.png" alt="search" width={15} height={15} />
         
        </button>
        
      </div>
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <p>Are you sure you want to delete this item?</p>
      <div className="modal-buttons">
       <button onClick={yes}>yes</button>
       <button onClick={no}>no</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
