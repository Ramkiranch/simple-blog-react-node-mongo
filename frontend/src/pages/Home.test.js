import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import axios from 'axios';
jest.mock('axios');

describe('Home', () => {
  it('renders title and create button', () => {
    render(<Home />);
    expect(screen.getByText(/All Blog Posts/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Post/i)).toBeInTheDocument();
  });

  it('renders posts from API', async () => {
    axios.get.mockResolvedValue({ data: [
      { _id: '1', title: 'Test', author: 'Tester', body: 'Body' }
    ] });
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/Test/i)).toBeInTheDocument();
      expect(screen.getByText(/by Tester/i)).toBeInTheDocument();
    });
  });
});
