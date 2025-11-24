const logger = (store) => (next) => (action) => {
  const returnValue = next(action);
  if (!store.getState().logger) {
    return returnValue;
  }

  console.group(action.type);
  console.log("The action: ", action);

  console.log("The new state: ", store.getState());
  console.groupEnd();

  return returnValue;
};

export default logger;
