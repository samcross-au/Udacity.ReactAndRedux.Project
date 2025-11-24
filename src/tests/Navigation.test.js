import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import Leaderboard from '../pages/Leaderboard';

import { createStore } from "redux";
import { RouterProvider } from "react-router";
import { MemoryRouter } from "react-router-dom";

import reducer from "../reducers";
import middleware from "../middleware";

import { _getUsers } from '../utils/_DATA';
import { within } from '@testing-library/dom';
import Navigation from '../components/Navigation';

let view;
let store;
let questionId;
let authedUser;

let users = {};
let questions = {};
let question = {}

let links = [
  {
    id: "home-link",
    url: "/",
    text: "Home",
  },
  {
    id: "new-question-link",
    url: "/new",
    text: "New Question",
  },
  {
    id: "leaderboard-link",
    url: "/leaderboard",
    text: "Leaderboard",
  },
  {
    id: "profile-link",
    url: "/profile",
    text: "",
  },
];

beforeEach(async () => {
  users = await _getUsers();
  authedUser = Object.keys(users)[0];

  const initialState = {
    authedUser,
    users,
    questions: {},
    loadingBar: 0,
    logger: false
  };
  
  const store = createStore(reducer, initialState, middleware);
  view = render(
    <Provider store={store}>
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Navigation />
      </MemoryRouter>
    </Provider>
  );
});

describe('Navigation', () => {
  it('will have all expected links', async function() {
    links.forEach((link) => {
      expect(view.getByTestId(link.id)).toBeInTheDocument();
      expect(view.getByTestId(link.id).getAttribute('href')).toBe(link.url);
    })
  });
});