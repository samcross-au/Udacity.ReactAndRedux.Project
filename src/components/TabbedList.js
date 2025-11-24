import { useEffect, useState } from "react";
import PollList from "../components/PollList";

const TabbedList = ({categories}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

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

export default TabbedList;