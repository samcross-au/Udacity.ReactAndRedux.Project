import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      {
        users.slice().sort((a, b) => b.totalScore - a.totalScore).map((user, index) => {
          return (
            <div key={user.id} className="leaderboard-user" data-testid={"profile_" + user.id}>
              <div className="profile-info">
                <span className="profile-rank" data-testid="profile-rank">{index + 1}.</span>
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="profile-avatar" data-testid="profile-avatar" />
                <span className="profile-name" data-testid="profile-name">{user.name}</span>
                <span className="profile-username" data-testid="profile-username">@{user.id}</span>
              </div>
              <div className="profile-questions">
                <div className="profile-questions-asked" data-testid="profile-questions-asked">Questions asked: {user.questions.length}</div>
                <div className="profile-questions-answered" data-testid="profile-questions-answered">Questions answered: {Object.keys(user.answers).length}</div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  return {
    authedUser,
    users: Object.values(users).map((user) => {
      return {
        ...user,
        totalScore: user.questions.length + Object.keys(user.answers).length,
      }
    }),
    questions
  };
};

export default connect(mapStateToProps)(Leaderboard);