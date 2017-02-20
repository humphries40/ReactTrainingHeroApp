import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NavBar from '../components/Navigation';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <NavBar />
      {this.props.children}
      </div>
    );
  }
}

export default connect(state => ({}))(AppContainer);
