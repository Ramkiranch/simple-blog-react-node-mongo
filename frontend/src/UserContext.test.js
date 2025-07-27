import { render, screen, fireEvent } from '@testing-library/react';
import { UserProvider, UserContext } from '../UserContext';
import React from 'react';

describe('UserContext', () => {
  it('provides user and token', () => {
    let contextValue;
    render(
      <UserProvider>
        <UserContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
    expect(contextValue.user).toBe(null);
    expect(contextValue.token).toBe(null);
  });

  it('login and logout updates context', () => {
    let contextValue;
    render(
      <UserProvider>
        <UserContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
    contextValue.login({ id: '1', name: 'Test', email: 'test@example.com' }, 'token123');
    expect(contextValue.user.name).toBe('Test');
    expect(contextValue.token).toBe('token123');
    contextValue.logout();
    expect(contextValue.user).toBe(null);
    expect(contextValue.token).toBe(null);
  });
});
