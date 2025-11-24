import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { handleAnswerQuestion } from '../actions/questions';

const Poll = ({ dispatch, authedUser, users, question }) => {
  const {
    name,
    id,
    timestamp,
    options,
    totalVotes,
    hasAnswered
  } = question;

  const handleSelect = (id) => {
    dispatch(
      handleAnswerQuestion({
        qid: question.id,
        answer: id,
        authedUser: authedUser.id
      })
    );
  };

  if (question === null) {
    return <p>This question doesn't exist</p>;
  }

  return (
    <div to={`/question/${id}`} className="question">
      <div className="question-info">
        <div>
          <h2>Would You Rather?</h2>
          <div className="option-container">
            {Object.keys(options).map((optionId) => (
              <div key={optionId} id={optionId} className="option">
                {
                  <div>
                    <button disabled={hasAnswered} data-selected={options[optionId].votes.includes(authedUser.id)} onClick={() => handleSelect(optionId)}>{options[optionId].text}</button>
                    {
                      hasAnswered && (
                        <div className="answers">
                          <span className="total-answers" data-testid={`${optionId}-percentage`}>{parseInt((options[optionId].votes.length / totalVotes) * 100)}%</span>
                          <span className="answers-avatars">
                            {
                              options[optionId].votes.map((vote) => {
                                const user = users[vote];
                                return (<img key={user.id} src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />);
                              })
                            }
                          </span>
                        </div>
                      )
                    }
                  </div>
                }
              </div>
            ))}
          </div>
          <hr />
          <div className="total-votes">Total Votes: {totalVotes}</div>
          <div className="author">
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    users,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default connect(mapStateToProps)(Poll);