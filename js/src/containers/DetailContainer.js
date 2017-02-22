import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Hero from '../components/Hero';
import { URI, defaultHero, EVENTS } from '../config/settings'

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.updateHero = this.updateHero.bind(this);
  }

  init(data) {
    const { dispatch, params} = this.props;
    const hero = params.id ? data.filter(h => h.uuid === params.id)[0] : defaultHero();
    dispatch({ type: EVENTS.GET_HERO, hero: hero });
  }

  componentDidMount() {
    $.getJSON(URI, ((data) => this.init(data)));
  }

  updateHero(updatedHero) {
    const {dispatch, router} = this.props;
    dispatch({ type: EVENTS.EDIT_HERO, hero: updatedHero });
  }

  render() {
    return (<div>
      <Hero hero={this.props.hero} params={this.props.params} updateHero={this.updateHero} />
    </div>
    );
  }
}

export default connect(state => ({ hero: state.hero }))(DetailContainer);




