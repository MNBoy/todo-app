import { useCallback, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import HomeLayout from '@components/layouts/HomeLayout';

import AppContext from 'context/AppContext';

import Todo from '@interfaces/Todo';

export default function App({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((todo: Todo | Todo[]) => {
    if (Array.isArray(todo)) {
      setTodos(todo);
    } else {
      setTodos((prev) => {
        return [...prev, todo];
      });
    }
  }, []);

  const editTodo = useCallback(
    (todo: Todo) => {
      const foundIndex = todos.findIndex((item) => item.id === todo.id);
      const copyTodos = todos;
      copyTodos[foundIndex] = todo;
      localStorage.setItem('todos', JSON.stringify(copyTodos));
      setTodos([...copyTodos]);
    },
    [todos]
  );

  const doneTodo = useCallback(
    (id: number) => {
      const foundIndex = todos.findIndex((todo) => todo.id === id);
      const copyTodos = todos;
      copyTodos[foundIndex] = { ...copyTodos[foundIndex], done: true };
      localStorage.setItem('todos', JSON.stringify(copyTodos));
      setTodos([...copyTodos]);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const filteredList = todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(filteredList));
      setTodos([...filteredList]);
    },
    [todos]
  );

  const value = {
    todos,
    addTodo,
    editTodo,
    doneTodo,
    deleteTodo,
  };

  return (
    <AppContext.Provider value={value}>
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    </AppContext.Provider>
  );
}
