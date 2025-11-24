import { connect } from "react-redux";

import Question from '../components/Question';
import { formatQuestion, formatDate } from "../utils/helpers";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = (props) => {
  if (!props.question) {
    return (
      <div className="poll">
        <p>Question not found</p>
      </div>
    );
  }

  return (
    <div className="poll">
      <Question id={props.question.id}/>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, ownProps) => {
  const id = ownProps?.router?.params?.id ?? null;
  const question = id ? questions[id] : null;

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));