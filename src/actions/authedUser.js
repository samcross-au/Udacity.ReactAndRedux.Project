export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const UNSET_AUTHED_USER = "UNSET_AUTHED_USER";

export function authUser(user) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(false);
      }

      resolve(dispatch(setAuthedUser(user)));
    });
  };
} 

export function setAuthedUser(user) {
  return {
    type: SET_AUTHED_USER,
    user,
  };
}

export function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER,
  };
}
