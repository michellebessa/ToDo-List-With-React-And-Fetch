import React, { useState, useEffect } from "react";

const TodoListReactFetch = () => {
  
  const [list, setList] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const backendURL =
    "https://assets.breatheco.de/apis/fake/todos/user/michellebessa";

  const getList = () => {
    fetch(backendURL)
      .then((res) => res.json())
      .then((data) => setList(data));
  };

  useEffect(() => {
    getList();
  }, []);

  const addItemsList = (inputValue) => {
    let newTodoArray = [
      ...list,
      {
        label: inputValue,
        done: false,
      },
    ];
    fetch("https://assets.breatheco.de/apis/fake/todos/user/michellebessa", {
      method: "PUT",
      body: JSON.stringify(newTodoArray),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((response) => {
        console.log("Success:", response);
        getList();
      })
      .catch((error) => console.error(error));
    setInputValue("");
  };

  function removeItem(i) {
  let filtered = list.filter((task, index)=>{
    i != index;
    return i != index;
  })
  fetch(
    "https://assets.breatheco.de/apis/fake/todos/user/michellebessa",
    {
      method: "PUT",
      body: JSON.stringify(filtered),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((response) => {
      console.log("Success:", response);
      getList();
    })
    .catch((error) => console.error(error));
  setTodoArray(filtered);
  }

  let mappedTodoArray = list.map((task, index) => {
		return (
			<li>
				{task.label}
				<button onClick={() => removeItem(index)}>
        <i class="fas fa-trash"></i>
				</button>{" "}
			</li>
		);
	});

const clearItem=()=>{
 setList([])
}

  return (
		<div className="todoBox">
			<div className="header">
				<h1>Todos</h1>
				<button className="clearAll" onClick={() => clearItem()}>
					{" "}
					Clear All{" "}
				</button>
			</div>
			<div className="inputField">
				<input
					id="newTask"
          onChange={(e)=>setInputValue(e.target.value)}
					type="text"
					placeholder="Type something to do..."
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							addItemsList(inputValue);
						}
					}}
				/>
			</div>
			<div>
				<ul>{mappedTodoArray}</ul>
			</div>
		</div>
	);
};

export default TodoListReactFetch;
