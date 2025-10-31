import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex gap-2 align-items-center mb-2">
      <span>{todo.title}</span>
      <div className="ms-auto d-flex gap-2">
        <Button
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          className="btn btn-primary text-white"
        >
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          className="btn btn-danger text-white"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}
