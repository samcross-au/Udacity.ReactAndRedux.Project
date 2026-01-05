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
  return async (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    const question = await saveQuestion({
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser.id,
    });

    authedUser.questions.push(question.id);

    dispatch(addQuestion(question));
    
    return dispatch(hideLoading());
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
  return async (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(answerQuestion(data));
    authedUser.answers[data.qid] = data.answer;
    
    return await saveQuestionAnswer(data);
  };
}