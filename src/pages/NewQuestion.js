import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleAddQuestion } from "../actions/questions";

const NewQuestion = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    const name = e.target.name;

    let setter = setOption1;
    if (name === 'option2') {
      setter = setOption2
    }

    setter(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(option1, option2));

    setOption1("");
    setOption2("");

    navigate('/');
  };

  return (
    <div className="new-question">
      <h3 className="center">Write new Question</h3>
      <form className="new-question" onSubmit={handleSubmit}>
        <div className="new-options">
          <textarea
            placeholder="Option 1"
            value={option1}
            name="option1"
            onChange={handleChange}
            className="textarea"
          />
          <textarea
            placeholder="Option 2"
            value={option2}
            name="option2"
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <button className="btn" type="submit" disabled={option1 === "" || option2 === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }, props) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);
