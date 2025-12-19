import {configureStore} from '@reduxjs/toolkit';
import reducer from "../reducers";
import middleware from "../middleware";

export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: reducer,
    preloadedState
  })
}