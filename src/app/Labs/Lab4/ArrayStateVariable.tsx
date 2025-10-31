"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const { todos } = useSelector((state: any) => state.todosReducer);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="container mt-3">
      <h2>Array State Variable</h2>

      <button className="btn btn-success mb-3" onClick={addElement}>
        Add Element
      </button>

      <ul className="list-group mb-3">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{item}</span>
            <button
              className="btn btn-danger"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Todos from Redux</h3>
      <ListGroup className="mb-3">
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
