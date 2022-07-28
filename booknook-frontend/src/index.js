import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules/index';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import {tempSetUser, check } from './modules/user';
// set meta tag via react-helmet-async
import { HelmetProvider } from 'react-helmet-async';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();
// store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// run saga
sagaMiddleware.run(rootSaga);

loadUser();

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App/>
        </HelmetProvider>
      </BrowserRouter>
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
