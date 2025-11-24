import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import Leaderboard from '../pages/Leaderboard';

import { createStore } from "redux";

import reducer from "../reducers";
import middleware from "../middleware";

import { _getUsers } from '../utils/_DATA';
import { within } from '@testing-library/dom';

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
      <Leaderboard />
    </Provider>
  );
});

describe('Leaderboard', () => {
  it('will have all expected fields', async function() {
    const users = await _getUsers();

    Object.values(users).forEach((user) => {
      const userId = user.id;
      const userName = user.name;
      const userQuestions = user.questions.length
      const userAnswers = Object.values(user.answers).length;

      const standing = view.getByTestId(`profile_${user.id}`)
      const name = within(standing).getByTestId('profile-name');
      const questionsAsked = within(standing).getByTestId('profile-questions-asked');
      const questionsAnswered = within(standing).getByTestId('profile-questions-answered');

      expect(name).toHaveTextContent(userName);
      expect(questionsAsked).toHaveTextContent(`Questions asked: ${userQuestions}`);
      expect(questionsAnswered).toHaveTextContent(`Questions answered: ${userAnswers}`);
    })
  });
});