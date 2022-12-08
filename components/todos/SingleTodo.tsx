import React from 'react';

import Todo from '@interfaces/Todo';
import { Button } from 'antd';
import { useTodo } from '../../context/AppContext';

const priorityColors: any = {
  low: '#166534',
  medium: '#F97316',
  high: '#EF4444',
};

const SingleTodo = ({ todo, selectTodo }: { todo: Todo; selectTodo?: any }) => {
  const { doneTodo } = useTodo();

  /**
   * A function that is called when a user clicks on a card. It checks if the user clicked on a card
   * and if so, it calls the selectTodo function.
   */
  const openDeatils = (e: any) => {
    if (selectTodo) {
      const el = e.target as HTMLElement;
      if (!!el.getAttribute('data-card')) selectTodo(todo, false);
    }
  };

  return (
    <div
      className='flex items-center justify-between w-full px-2 py-4 border rounded'
      style={{
        cursor: !!selectTodo ? 'pointer' : '',
      }}
      onClick={openDeatils}
      data-card='true'
      data-testid='single-todo'
    >
      <div className='flex flex-col gap-y-2' data-card='true'>
        <h2 data-card='true' className='text-xl font-medium md:text-2xl'>
          {todo?.title}
        </h2>
        <p data-card='true'>
          {todo?.description.slice(0, 20)}
          {todo?.description.length > 20 && ' ...'}
        </p>
      </div>
      <div className='flex flex-col items-end gap-y-2' data-card='true'>
        <div className='flex items-center gap-x-2' data-card='true'>
          <span data-card='true' className='text-sm uppercase md:text-base'>
            {todo?.priority}
          </span>
          <div
            className='w-8 h-8 rounded-full'
            data-card='true'
            style={{
              backgroundColor: priorityColors[todo?.priority],
            }}
          ></div>
        </div>
        {!todo?.done && (
          <div className='flex gap-x-2'>
            <Button onClick={() => doneTodo(todo?.id)}>Done Task</Button>
            <Button data-testid='edit-task-btn' onClick={() => selectTodo(todo)}>Edit Task</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTodo;
