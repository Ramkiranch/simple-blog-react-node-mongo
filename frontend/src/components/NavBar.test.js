import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { UserContext } from '../UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('NavBar', () => {
  it('shows login/register when not logged in', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null }}>
          <NavBar />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it('shows user menu when logged in', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: { name: 'Test User' }, logout: jest.fn() }}>
          <NavBar />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
