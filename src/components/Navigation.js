import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = ({ authedUser }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-list">
          <div className="nav-list-item">
            <Link to="/" data-testid="home-link">Home</Link>
          </div>
          <div className="nav-list-item">
            <Link to="/new" data-testid="new-question-link">New Question</Link>
          </div>
          <div className="nav-list-item">
            <Link to="/leaderboard" data-testid="leaderboard-link">Leaderboard</Link>
          </div>
        </div>
        <div className="nav-user">
          <Link to="/profile" data-testid="profile-link">
            <img src={authedUser.avatarURL} alt={`Avatar of ${authedUser.name}`} className="avatar" />{authedUser.name}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Navigation);