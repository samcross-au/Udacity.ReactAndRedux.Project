import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { formatQuestion } from "../utils/helpers";
import PollList from "../components/PollList";

const TabbedList = ({categories}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [categories]);

  const handleTabClick = (e) => {
    const categoryKey = e.target.dataset.questionType;
    setActiveCategory(categories.find((category) => category.id === categoryKey));
  }

  return (
    <div>
      <div className="tab-container">
        {
          categories.map((category) => (
            <div key={category.id} data-active={activeCategory === category && true} className='tab' data-question-type={category.id} onClick={handleTabClick}>
              {category.title}
            </div>
          ))
        }
      </div>
      <div className="poll-list-container">
        <div key={activeCategory.id} className="poll-list">
          <PollList polls={activeCategory.data} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const formattedQuestions = Object.values(questions).map((question) => question
    ? formatQuestion(question, users[question.author], authedUser) : null);

  const categories = [
    {
      id: 'new',
      title: 'New Polls',
      data: formattedQuestions.filter((question) => !question.hasAnswered).sort((a, b) => b.timestamp - a.timestamp),
    },
    {
      id: 'answered',
      title: 'Answered Polls',
      data: formattedQuestions.filter((question) => question.hasAnswered).sort((a, b) => b.timestamp - a.timestamp),
    }
  ]

  console.log('Categories: ', categories);

  return {
    authedUser: Object.values(users).find((user) => user.id === authedUser),
    categories,
  };
};

export default connect(mapStateToProps)(TabbedList);