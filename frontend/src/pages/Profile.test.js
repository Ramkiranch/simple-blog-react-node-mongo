import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { UserContext } from '../UserContext';
import axios from 'axios';
jest.mock('axios');

const mockUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  lastLogin: new Date().toISOString(),
};
const mockLogin = jest.fn();

describe('Profile', () => {
  it('renders profile fields', () => {
    render(
      <UserContext.Provider value={{ user: mockUser, token: 'token', login: mockLogin }}>
        <Profile />
      </UserContext.Provider>
    );
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Test User/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test@example.com/i)).toBeInTheDocument();
  });

  it('updates profile', async () => {
    axios.put.mockResolvedValue({ data: { name: 'New Name', email: 'new@example.com', lastLogin: new Date().toISOString() } });
    render(
      <UserContext.Provider value={{ user: mockUser, token: 'token', login: mockLogin }}>
        <Profile />
      </UserContext.Provider>
    );
    fireEvent.change(screen.getByDisplayValue(/Test User/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByDisplayValue(/test@example.com/i), { target: { value: 'new@example.com' } });
    fireEvent.click(screen.getByText(/Update Profile/i));
    await waitFor(() => {
      expect(screen.getByText(/Profile updated!/i)).toBeInTheDocument();
    });
    expect(mockLogin).toHaveBeenCalled();
  });
});
