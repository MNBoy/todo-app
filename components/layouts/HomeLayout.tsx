import React, { useState } from 'react';

import { Avatar, Badge, Button, ConfigProvider, Modal } from 'antd';

import AppProps from '@interfaces/AppProps';

import { useTodo } from '../../context/AppContext';
import SingleTodo from '../todos/SingleTodo';

const HomeLayout: React.FC<AppProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos } = useTodo();

  const filteredTodos = todos.filter((todo) => todo.done);

  return (
    <main className='flex flex-col min-h-screen mx-auto max-w-screen-2xl' data-testid='layout'>
      {/* Navbar */}
      <nav className='flex items-center h-16 px-10 shadow justify-evenly md:justify-start'>
        <div className='w-[47%] left-20'>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#009457',
                colorPrimaryHover: '#009457',
              },
            }}
          >
            <Badge count={filteredTodos.length}>
              <Button type='primary' data-testid='done-tasks-btn' onClick={() => setIsModalOpen(true)} className='bg-[#009457]'>
                View Done Tasks
              </Button>
            </Badge>
          </ConfigProvider>
        </div>
        <h1 className='font-medium text-center'>TODO APP</h1>
      </nav>

      {/* Modal */}
      <Modal
        data-testid='done-tasks-modal'
        footer={[
          <Button key='back' type='dashed' onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
        ]}
        title='Done Tasks'
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
      >
        {/* Todos */}
        {todos.length > 0 && (
          <div className='flex flex-col items-center w-full overflow-y-scroll max-h-96 gap-y-4'>
            {filteredTodos.map((todo) => (
              <SingleTodo key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </Modal>

      {/* Content */}
      <section className='h-[calc(100vh-64px)] p-4'>{children}</section>
    </main>
  );
};

export default HomeLayout;
