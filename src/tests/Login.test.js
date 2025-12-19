import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Login from '../pages/Login';
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { _getQuestions, _getUsers } from '../utils/_DATA';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../utils/testing';

let view;

beforeEach(async () => {
  const users = await _getUsers();
  const initialState = {
    authedUser: null,
    users: await _getUsers(),
    questions: await _getQuestions(),
    loadingBar: 0,
    logger: false
  };
  
  view = renderWithProviders(
    <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Login />
    </MemoryRouter>,
    {
      preloadedState: initialState,
    }
  );
});

describe('Login', () => {
  it('will match the snapshot', async function () {
    expect(view).toMatchSnapshot();
  });
});

describe("login content", () => {  
  it('will have all expected fields', async () => {
    const usernameInput = view.getByTestId('user-name-input');
    const passwordInput = view.getByTestId('password-input');
    const submitButton = view.getByTestId('submit-button');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('will return an error if the wrong username or password is entered', async () => {
    const usernameInput = view.getByTestId('user-name-input');
    fireEvent.change(usernameInput, { target: { value: 'sarahedo' }});

    const passwordInput = view.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password124' } });

    const submitButton = view.getByTestId('submit-button');

    await React.act(async () => {
      fireEvent.click(submitButton);
    });

    expect(view.queryByTestId('error-header')).toBeInTheDocument();
  });
});
