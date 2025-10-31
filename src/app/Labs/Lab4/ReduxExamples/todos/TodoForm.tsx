"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem, FormControl } from "react-bootstrap";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroupItem className="d-flex gap-2 mb-2">
            <FormControl
                value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                className="form-control flex-grow-1"
            />
            <Button
                onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"
                className="btn btn-success text-white"
            >
                Add
            </Button>
            <Button
                onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"
                className="btn btn-warning text-dark"
            >
                Update
            </Button>
        </ListGroupItem>
    );
}
