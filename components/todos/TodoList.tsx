import React, { useEffect, useRef, useState } from 'react';

import { Button, ConfigProvider, Divider, message, Modal, Pagination } from 'antd';

import { useTodo } from '../../context/AppContext';
import Todo from '@interfaces/Todo';

import SingleTodo from './SingleTodo';
import AddForm from './AddForm';
import SingleTodoSkeleton from './SingleTodoSkeleton';

const PER_PAGE = 4;

const TodoList: React.FC = () => {
  const { todos, addTodo, editTodo, deleteTodo, doneTodo } = useTodo();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const childRef = useRef(null);
  const [page, setPage] = useState(1);

  const filteredTodos = todos.filter((todo) => !todo.done);

  const selectTodo = (todo: Todo, edit: boolean = true) => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedTodo(todo);
    edit ? setIsModalOpen(true) : setIsDetailModalOpen(true);
  };

  useEffect(() => {
    // Simulation API call
    const getData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const oldTodos: any = localStorage.getItem('todos');
              if (oldTodos) addTodo(JSON.parse(oldTodos));
              resolve(oldTodos);
            } catch (error) {
              reject(error);
            }
          }, 1000);
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getData();
  }, [addTodo]);

  const addTask = () => {
    setSelectedTodo(null);
    setIsModalOpen(true);
  };

  const deleteTask = async (id: number) => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    try {
      message.loading({
        key: 'message',
        content: 'Loading...',
      });

      // Simulation API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            deleteTodo(id);
            resolve(id);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });

      message.success({
        key: 'message',
        content: 'Task deleted successfully!',
      });
    } catch (error: any) {
      message.error({
        key: 'message',
        content: error.message,
      });
    }
  };

  const onReset = () => {
    const child: any = childRef.current;
    child.onReset();
  };

  const onFinish = () => {
    const child: any = childRef.current;
    child.onFinish();
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-y-4' data-testid='todo-list'>
      {/* Todos */}
      <div className='flex flex-col items-center w-11/12 md:w-2/3 gap-y-4'>
        {isLoading && new Array(2).fill('').map((skeleton, index) => <SingleTodoSkeleton key={index} />)}
        {filteredTodos.length > 0 &&
          !isLoading &&
          filteredTodos
            .slice((page - 1) * PER_PAGE, page * PER_PAGE)
            .map((todo) => <SingleTodo selectTodo={selectTodo} key={todo.id} todo={todo} />)}
      </div>

      {/* Add Btn */}
      <Button data-testid='add-taks-btn' className='w-40' type='dashed' onClick={addTask}>
        Add Task
      </Button>

      {/* Pagination */}
      <Pagination simple onChange={setPage} current={page} pageSize={PER_PAGE} total={filteredTodos.length} />

      {/* Add and Update Modal */}
      <Modal
        footer={[
          <Button
            key='back'
            danger
            type='dashed'
            onClick={() => {
              !selectedTodo ? onReset() : deleteTask(selectedTodo!.id);
            }}
          >
            {!!selectedTodo ? 'Delete' : 'Reset'}
          </Button>,
          <Button key='submit' onClick={onFinish}>
            {!!selectedTodo ? 'Update' : 'Submit'}
          </Button>,
        ]}
        data-testid='add-update-modal'
        title={!!selectedTodo ? `Edit ${selectedTodo?.title}` : 'Add Task'}
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
      >
        <AddForm
          ref={childRef}
          selectedTodo={selectedTodo}
          addTodo={addTodo}
          editTodo={editTodo}
          todos={todos}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Detail Modal */}
      <Modal
        footer={[
          <Button key='submit' onClick={() => selectedTodo && selectTodo(selectedTodo)}>
            Edit Task
          </Button>,
          <ConfigProvider
            key='done'
            theme={{
              token: {
                colorPrimary: '#03d867',
                colorPrimaryHover: '#03d867',
              },
            }}
          >
            <Button
              className='border-[#019647] text-[#019647]'
              onClick={() => {
                setIsDetailModalOpen(false);
                doneTodo(selectedTodo!.id);
              }}
            >
              Done Task
            </Button>
          </ConfigProvider>,
          <Button key='delete' danger onClick={() => deleteTask(selectedTodo!.id)}>
            Delete Task
          </Button>,
        ]}
        title='Task Details'
        open={isDetailModalOpen}
        centered
        onCancel={() => setIsDetailModalOpen(false)}
      >
        <div className='flex flex-col gap-y-2'>
          <Divider />
          <h2 className='text-lg font-medium'>
            Title: <span className='font-normal'>{selectedTodo?.title} </span>
            <span className='font-normal uppercase'>({selectedTodo?.priority})</span>
          </h2>
          <div className='flex flex-col'>
            <h2 className='text-lg font-medium'>Description:</h2>
            <p>{selectedTodo?.description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
