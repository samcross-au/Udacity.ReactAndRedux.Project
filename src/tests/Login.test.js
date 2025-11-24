import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Login from '../pages/Login';
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { _getUsers } from '../utils/_DATA';

let view;

beforeEach(async () => {
  const users = await _getUsers();
  const initialState = {
    authedUser: null,
    users,
    questions: {},
    loadingBar: 0,
    logger: false
  };
  
  const store = createStore(reducer, initialState, middleware);
  view = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
});

describe('Login', () => {
  it('will match the snapshot', function () {
    expect(view).toMatchSnapshot();
  });

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