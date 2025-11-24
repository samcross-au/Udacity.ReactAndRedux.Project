import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { unsetAuthedUser } from "../actions/authedUser";

const Profile = ({ dispatch, authedUser, questions }) => {
  let navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(unsetAuthedUser());
    navigate('/');
  }

  return (
    <div>
      <div className="profile">
        <div className="profile-picture">
          <img src={authedUser.avatarURL} alt={`Avatar of ${authedUser.name}`} className="profile-avatar" />
        </div>
        <div className="profile-info">
          <div className="profile-name">
            <h3 className="profile-value">
              {authedUser.name}
            </h3>
          </div>
          <div className="profile-questions-asked">
            <span className="profile-key">Questions Asked:</span>
            <span className="profile-value">
              <ul className="profile-questions">
                {
                  authedUser.questions.map((questionId) => {
                    const question = questions[questionId];
                    return (
                      <li key={question.id} className="profile-question">
                        <Link to={`/question/${question.id}`} className="question-link">
                          {question.optionOne.text} OR {question.optionTwo.text}?
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </span>
          </div>
          <div className="profile-questions-answered">
            <span className="profile-key">Questions Answered</span>
            <span className="profile-value">
              <ul className="profile-questions">
                {
                  Object.keys(authedUser.answers).map((questionId) => {
                    const question = questions[questionId];
                    return (
                      <li key={question.id} className="profile-question">
                        <Link to={`/question/${question.id}`} className="question-link">
                          {question.optionOne.text} OR {question.optionTwo.text}?
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div className="logout">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  return {
    authedUser,
    questions,
  };
};

export default connect(mapStateToProps)(Profile);