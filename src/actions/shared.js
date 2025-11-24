import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "./loading";
import { enableLogging, disableLogging } from "./logger";

const AUTHED_USER = 'sarahedo';
const LOGGER = true;

const loggerConfig = LOGGER ? enableLogging : disableLogging

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(loggerConfig())
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
