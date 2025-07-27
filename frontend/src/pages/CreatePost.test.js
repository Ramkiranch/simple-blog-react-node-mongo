import { render, screen, fireEvent } from '@testing-library/react';
import CreatePost from './CreatePost';
import axios from 'axios';
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CreatePost', () => {
  it('renders form fields', () => {
    render(<CreatePost />);
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Author/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Body/i)).toBeInTheDocument();
  });

  it('submits form and navigates', async () => {
    axios.post.mockResolvedValue({});
    render(<CreatePost />);
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByPlaceholderText(/Body/i), { target: { value: 'Body' } });
    fireEvent.click(screen.getByText(/Submit/i));
    await screen.findByText(/Create New Post/i);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
