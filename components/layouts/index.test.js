import { render, screen, fireEvent } from '@testing-library/react';
import HomeLayout from './HomeLayout';

describe('Layout', () => {
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
  it('render layout', () => {
    render(<HomeLayout />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  // Acts
  it('open done tasks modal when user click view done tasks button', () => {
    render(<HomeLayout />);
    const btnElement = screen.getByTestId('done-tasks-btn');

    fireEvent.click(btnElement);

    expect(screen.getByTestId('done-tasks-modal')).toBeInTheDocument();
  });
});
