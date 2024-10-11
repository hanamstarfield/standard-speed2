"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data);
    };
    getTodos();
  }, []);

  // 리스트 추가
  const addTodo = async () => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      contents,
      isDone: false,
    };
    const res = await axios.post("http://localhost:4000/todos", newTodo);
    setTodos([...todos, res.data]);
  };

  // 리스트 삭제
  const deleteTodo = async (id: string) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearTodo = async (id: string) => {
    const updateTodo = todos.find((todo) => todo.id === id);

    if (updateTodo) {
      const changeTodo = {
        ...updateTodo,
        isDone: !updateTodo.isDone,
      };

      await axios.patch(`http://localhost:4000/todos/${id}`, changeTodo);
      setTodos(todos.map((todo) => (todo.id === id ? changeTodo : todo)));
    }
  };

  return (
    <div>
      <div>
        <h1>MY TODOLIST!</h1>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button onClick={addTodo}>추가하기</button>
      </div>
      <div>
        <h2>Todo List</h2>
        <br />
        <ul>
          {todos
            .filter((todo) => !todo.isDone)
            .map((todo) => {
              return (
                <li key={todo.id}>
                  <p>{todo.title}</p>
                  <p>{todo.contents}</p>
                  <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
                  <button onClick={() => clearTodo(todo.id)}>
                    {todo.isDone ? "취소" : "완료"}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <br />
        <h2>Done!</h2>
        <br />
        <ul>
          {todos
            .filter((todo) => todo.isDone)
            .map((todo) => {
              return (
                <li key={todo.id}>
                  <p>{todo.title}</p>
                  <p>{todo.contents}</p>
                  <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
                  <button onClick={() => clearTodo(todo.id)}>
                    {todo.isDone ? "취소" : "완료"}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
