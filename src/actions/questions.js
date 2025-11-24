import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "./loading";

// EVENT TYPE KEYS
export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

// EVENT ACTIONS
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(option1, option2) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser.id,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function answerQuestion({ qid, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function handleAnswerQuestion(data) {
  return (dispatch) => {
    dispatch(answerQuestion(data));

    return saveQuestionAnswer(data).catch((e) => {
      console.warn("Error in handleAnswerQuestion: ", e);
      dispatch(answerQuestion(data));
      alert("The was an error answering the question. Try again.");
    });
  };
}