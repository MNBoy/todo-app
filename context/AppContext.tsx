import React, { useContext, useState } from 'react';

import Todo from '@interfaces/Todo';

/* Defining the shape of the context object. */
interface AppContextInterface {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  doneTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

/* Creating a context object. */
const AppContext = React.createContext<AppContextInterface>({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  doneTodo: () => {},
  deleteTodo: () => {},
});

/* It returns the value of the AppContext object, which is the state of the app */
export const useTodo = () => useContext(AppContext);

export default AppContext;
