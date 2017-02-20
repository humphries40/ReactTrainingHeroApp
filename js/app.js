import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import AppContainer from './src/containers/AppContainer';
import reducer from './src/reducers';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
import HeroList from './src/components/HeroList'
const store = createStore(reducer);

const main = (
  <div>
    <nav className="navbar navbar-inverse bg-inverse" >
      <a className="navbar-brand" href="#">App</a>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/heroList">Hero List</Link>
          <Link className="nav-item nav-link" to="#">Link 2</Link>
        </div>
      </div>
    </nav>
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/">
          <IndexRoute component={AppContainer} />
          <Route path="heroList" component={HeroList} />
        </Route>
      </Router>
    </Provider>
  </div>
);

ReactDOM.render(main, document.getElementById('main'));

