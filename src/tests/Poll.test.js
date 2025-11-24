import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router";
import { createStore } from "redux";

import Poll from '../pages/Poll';

import reducer from "../reducers";
import middleware from "../middleware";


import { _getUsers, _getQuestions } from '../utils/_DATA';

let view;
let store;
let questionId;
let authedUser;

let users = {};
let questions = {};
let question = {}

beforeEach(async () => {
  users = await _getUsers();
  questions = await _getQuestions();

  authedUser = Object.keys(users)[0];
  questionId = Object.keys(users[authedUser].answers)[0];
  question = questions[questionId];

  
  const initialState = {
    authedUser,
    users,
    questions,
    loadingBar: 0,
    logger: false
  };
  
  store = createStore(reducer, initialState, middleware);
  
  const router = createMemoryRouter(
    [{ path: "/questions/:id", element: <Poll /> }],
    { initialEntries: [`/questions/${questionId}`], future: { v7_startTransition: true } }
  );

  view = render(
    <Provider store={store}>
      <RouterProvider router={router} future={{v7_startTransition: true}} />
    </Provider>
  );
});

describe('Poll', () => {
  it('renders the question UI', async () => {
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionOnePercentage = (parseInt(question.optionOne.votes.length / totalVotes) * 100);
    const optionTwoPercentage = (parseInt(question.optionTwo.votes.length / totalVotes) * 100);

    expect(view.getByText('Would You Rather?')).toBeInTheDocument();
    expect(view.getByText(question.optionOne.text)).toBeInTheDocument();

    expect(view.getByTestId('optionOne-percentage')).toHaveTextContent(`${optionOnePercentage}%`);
    expect(view.getByTestId('optionTwo-percentage')).toHaveTextContent(`${optionTwoPercentage}%`);
  });

  // it('renders the question UI', async () => {
  //   expect(view.getByText('Would You Rather?')).toBeInTheDocument();
    
  //   const q = questions[Object.keys(questions)[0]];
  //   expect(view.getByText(q.optionOne.text)).toBeInTheDocument();
  // });
});