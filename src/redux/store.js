import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer, 
  middleware: [thunk, logger]
});

export default store;