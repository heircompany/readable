import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/:category?" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={App} />
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );
// registerServiceWorker();
