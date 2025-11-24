import { useState } from "react";
import { connect } from "react-redux";

import { authUser } from "../actions/authedUser";

const Login = ({dispatch, users}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSelectChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    setPassword(users.find((user) => user.id === e.target.value).password);
  }

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    setError(false);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setError(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.id === username);

    dispatch(authUser(user && user.password === password ? user : null))
      .then(() => setError(false))
      .catch(() => setError(true));

    setUsername('');
    setPassword('');
  }

  return (
    <div className="login-portal">
      {users.length > 0 ? (
        <form className="new-login" onSubmit={handleSubmit}>
          <select name="user-select" value={username} onChange={handleSelectChange}>
            <option value="">Select a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {error &&
            <span className={"Error"} data-testid="error-header">
              Username and Password do not match. <br />
              Please try again
            </span>
          }
          <input name="username" onChange={handleUsernameChange} value={username} placeholder="User Name" data-testid="user-name-input"/>
          <input name="password" onChange={handlePasswordChange} value={password} placeholder="Password" data-testid="password-input"/>
          <button className="btn" type="submit" disabled={username === "" || password === ""} data-testid="submit-button">
            Submit
          </button>

        </form>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}

const mapStateToProps = ({ users, loading }) => {
  return {
    users: Object.values(users),
    isLoading: loading
  }
};

export default connect(mapStateToProps)(Login);