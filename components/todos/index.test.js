import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import SingleTodo from './SingleTodo';
import SingleTodoSkeleton from './SingleTodoSkeleton';
import AddForm from './AddForm';

describe('Todos', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  // Renders
  it('render todo list', () => {
    render(<TodoList />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  it('render single todo skeleton', () => {
    render(<SingleTodoSkeleton />);
    expect(screen.getByTestId('single-todo-skeleton')).toBeInTheDocument();
  });

  it('render single todo', () => {
    render(<SingleTodo />);
    expect(screen.getByTestId('single-todo')).toBeInTheDocument();
  });

  it('render add form', () => {
    render(<AddForm />);
    expect(screen.getByTestId('add-form')).toBeInTheDocument();
  });

  // Acts
  it('open add form modal when user click add task button', () => {
    render(<TodoList />);
    const btnElement = screen.getByTestId('add-taks-btn');

    fireEvent.click(btnElement);

    expect(screen.getByTestId('add-update-modal')).toBeInTheDocument();
  });
});
