import React, { useState, useEffect } from "react";
import "./Todo.css";

const getLocalData = () => {
  const lists = localStorage.getItem("todolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

export default function Todo() {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toEdit, setToEdit] = useState("");
  const [toggle, settoggle] = useState(false);
  //   console.log(inputdata);

  const addItem = () => {
    if (!inputdata) {
      alert("please enter data");
    } else if (inputdata && toggle) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === toEdit) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputdata("");
      setToEdit(null);
      settoggle(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, newInputData]);
      setInputdata("");
    }
  };
  //   console.log(items);

  const editItem = (index) => {
    const to_edit = items.find((curElem) => {
      return curElem.id === index;
    });

    setInputdata(to_edit.name);
    setToEdit(index);
    settoggle(true);
  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  const deleteAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="title">Add your list here!</div>
        <div className="add">
          <input
            type="text"
            value={inputdata}
            onChange={(event) => setInputdata(event.target.value)}
          />
          {toggle ? (
            <button onClick={addItem}>Upd</button>
          ) : (
            <button onClick={addItem}>Add</button>
          )}
        </div>

        <div className="items">
          {items.map((curElem) => {
            return (
              <div className="item" key={curElem.id}>
                <div className="itit">
                  <h4>{curElem.name}</h4>
                </div>
                <div className="div">
                  <button onClick={() => editItem(curElem.id)}>edit</button>
                  <button onClick={() => deleteItem(curElem.id)}>trash</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="but">
          <button className="l" onClick={deleteAll}>
            Delete all
          </button>
        </div>
      </div>
    </>
  );
}
