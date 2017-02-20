import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import AppContainer from './src/containers/AppContainer';
import reducer from './src/reducers';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
import HeroList from './src/components/HeroList';
import NavBar from './src/components/Navigation';

const store = createStore(reducer);

const main = (
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/" component={AppContainer}>
          {/*<IndexRoute component={AppContainer} />*/}
          <Route path="heroList" component={HeroList} />
        </Route>
      </Router>
    </Provider>
);

ReactDOM.render(main, document.getElementById('main'));

