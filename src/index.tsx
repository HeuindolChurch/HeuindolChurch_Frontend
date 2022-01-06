import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, {}, composeWithDevTools());
const persistor = persistStore(store as any)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
