import React, { useState, useEffect } from "react";
import "./Todo.css";
import logo from "./notes.png"
import add from "./add.png"
import edit from "./edit.png"
import trash from "./remove.png"

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
        <div className="logo"><img src={logo} alt="logo" /></div>
        <div className="title">Add your list here!</div>
        <div className="add">
          <input
            type="text"
            value={inputdata}
            onChange={(event) => setInputdata(event.target.value)}
            placeholder="Write here.."
          />
          {toggle ? (
            <button onClick={addItem}></button>
          ) : (
            <button className="addBut" onClick={addItem}><img src={add} alt="add" /></button>
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
                  <button className="divBut" onClick={() => editItem(curElem.id)}><img src={edit} alt="edit" /></button>
                  <button className="divBut" onClick={() => deleteItem(curElem.id)}><img src={trash} alt="delete" /></button>
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
