import { useEffect, useState } from "react";
import "./todoContainer.css";
export function TodoContainer() {
  const [newTodo, setNewTodo] = useState("");
  const [inputValue, setInputValue] = useState(() => {
    const localInputValue = localStorage.getItem("inputValue");
    try {
      return localInputValue ? JSON.parse(localInputValue) : [];
    } catch {
      return [];
    }
  });

  const inputChange = function (event) {
    setNewTodo(event.target.value);
  };

  const btnClick = function () {
    setInputValue([
      ...inputValue,
      { id: crypto.randomUUID(), text: newTodo, active: false },
    ]);
    setNewTodo("");
  };
  useEffect(() => {
    localStorage.setItem("inputValue", JSON.stringify(inputValue));
  }, [inputValue]);

  const toggleActive = (id) => {
    setInputValue(
      inputValue.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const ifinput = function () {
    if (inputValue.length !== 0) {
      return (
        <div className="ul-container">
          <ul>
            {inputValue.map((input) => {
              return (
                <div className="list" key={input.id}>
                  <span
                    className={`circle ${input.active ? "list-active" : ""}`}
                    onClick={() => toggleActive(input.id)}
                  ></span>
                  <li className="li">{input.text}</li>
                  <button
                    className="li-btn"
                    onClick={() => {
                      setInputValue(
                        inputValue.filter((item) => item.id !== input.id)
                      );
                    }}
                  >
                    <img src="/trash.png" alt="trash" width={15} height={15} />
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="empty-task">
          <div className="empty-task-img">
            <img src="\task-analysis.png" width={50} height={50} />
          </div>
          <div>
            right now the task bar is empty <br />
            add some tasks to the list so you can watch watch what happens
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-btn">
          <input
            placeholder="what do you want to do"
            type="text"
            onChange={inputChange}
            value={newTodo}
          />
          <button className="button " onClick={btnClick}>
            save
          </button>
        </div>
        <div className="task-manager">
          <p className="done"> done tasks: {inputValue.filter(item => item.active).length}</p>
          <p className="active">active tasks: {inputValue.length}</p>
        </div>
       
        <div className="content">{ifinput()}</div>
         <button
          className="button reset "
          onClick={() => {
            setInputValue([]);
          }}
        >
          reset
        </button>
      </div>
    </>
  );
}
