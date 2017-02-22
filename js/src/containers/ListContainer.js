import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import HeroList from '../components/HeroList';
import { URI, defaultHero, EVENTS } from '../config/settings'

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        // this.addUser = this.addUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
    }

    init(list) {
        let {dispatch} = this.props;
        dispatch({ type: EVENTS.LIST, heroes: list });
    }

    componentDidMount() {
        const jq = require('jquery');
        if (this.props.heroes.length === 0) {
            jq.getJSON(URI, (data) => this.init(data));
        }
    }

    render() {
        return (<div>
            <HeroList heroes={this.props.heroes} />
        </div>
        );
    }
}

export default connect(state => ({ heroes: state.heroes }))(ListContainer);
