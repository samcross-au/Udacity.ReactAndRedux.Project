import { connect } from "react-redux";
import QuestionLink from "./PollLink";

const PollList = ({polls}) => {
  return (
    <ul className="dashboard-question-list">
      {
        polls.length > 0 ?
        polls.map((question) => (
          <li key={question.id} className="question">
            <QuestionLink question={question}/>
          </li>
        )) :
        <li className="question">
          <div className="question-link">
            There are no more unanswered questions. Please check again later.
          </div>
        </li>
      }
    </ul>
  )
}

const mapStateToProps = ({ }, { polls }) => {
  return {
    polls
  }
};

export default connect(mapStateToProps)(PollList);