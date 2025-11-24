import { connect } from "react-redux";

import { formatQuestion } from "../utils/helpers";

import TabbedList from "../components/TabbedList";

const Dashboard = ({ categories }) => {
  return (
    <div className="polls">
      <h3 className="center">Polls</h3>
      <TabbedList categories={categories} />
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const formattedQuestions = Object.values(questions).map((question) => question
    ? formatQuestion(question, users[question.author], authedUser) : null);

  const categories = [
    {
      id: 'new',
      title: 'New Polls',
      data: formattedQuestions.filter((question) => !question.hasAnswered),
    },
    {
      id: 'answered',
      title: 'Answered Polls',
      data: formattedQuestions.filter((question) => question.hasAnswered),
    }
  ]

  return {
    authedUser: Object.values(users).find((user) => user.id === authedUser),
    categories,
  };
};

export default connect(mapStateToProps)(Dashboard);
