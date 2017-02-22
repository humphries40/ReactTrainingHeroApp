import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import DetailContainer from './src/containers/DetailContainer';
import ListContainer from './src/containers/ListContainer';
import reducer from './src/reducers';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
import NavBar from './src/components/Navigation';

const store = createStore(reducer);

const main = (
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/" component={NavBar}>
          <Route path="heroList" component={ListContainer} />
          <Route path="hero/(:id)" component={DetailContainer} />
          <Route path="newHero" component={DetailContainer} />
        </Route>
      </Router>
    </Provider>
);

ReactDOM.render(main, document.getElementById('main'));

