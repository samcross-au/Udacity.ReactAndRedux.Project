
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PollLink = ({ question }) => {
  return (
    <Link to={`/question/${question.id}`} className="question-link">
      <div className="link-title"><span className="author">{question.name}</span> asked: Would You Rather?</div>
      <div className="link-question">{Object.keys(question.options).map((optionId) => ( question.options[optionId].text )).join(' or ')}</div>
    </Link>
  );
}

const mapStateToProps = ({ }, { question }) => {
  return {
    question
  };
};

export default connect(mapStateToProps)(PollLink);