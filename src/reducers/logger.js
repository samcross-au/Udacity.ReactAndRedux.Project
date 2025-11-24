export default function logger(state = {}, action) {
  const { type } = action;

  switch (type) {
    case "ENABLE_LOGGING":
      return true;
    case "DISABLE_LOGGING":
      return false;
    default:
      return state;
  }
}
