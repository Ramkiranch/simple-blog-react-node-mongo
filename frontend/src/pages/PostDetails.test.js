import { render, screen, waitFor } from '@testing-library/react';
import PostDetails from './PostDetails';
import axios from 'axios';
jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('PostDetails', () => {
  it('renders loading initially', () => {
    render(<PostDetails />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders post details from API', async () => {
    axios.get.mockResolvedValue({ data: { _id: '1', title: 'Test', author: 'Tester', body: 'Body', createdAt: new Date().toISOString() } });
    render(<PostDetails />);
    await waitFor(() => {
      expect(screen.getByText(/Test/i)).toBeInTheDocument();
      expect(screen.getByText(/Tester/i)).toBeInTheDocument();
      expect(screen.getByText(/Body/i)).toBeInTheDocument();
    });
  });
});
