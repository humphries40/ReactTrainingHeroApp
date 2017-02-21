import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Hero from '../components/Hero';

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <Hero {...this.props.hero} {...this.props.params}/>
    </div>
    );
  }
}

export default connect(state => ({ Hero: state.hero }))(DetailContainer);