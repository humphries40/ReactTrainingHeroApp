import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import HeroList from '../components/HeroList';
import { HeroURI, defaultHero, EVENTS } from '../config/settings'

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.filterHeroes = this.filterHeroes.bind(this);
    }

    init(list) {
        let {dispatch} = this.props;
        dispatch({ type: EVENTS.LIST, heroes: list });
    }

    filterHeroes(list) {
        let {params} = this.props;
        const herolist = params.id ? list.filter(h => h.groups.indexOf(params.id) > -1) : list ? list : defaultHeros();
        return herolist
    }

    componentDidMount() {
        const jq = require('jquery');
        if (this.props.heroes.length === 0) {
            jq.getJSON(HeroURI, (data) => this.init(data));
        }
    }

    render() {
        return (<div>
            <HeroList heroes={this.filterHeroes(this.props.heroes)} groupid={this.props.params.id} />
        </div>
        );
    }
}

export default connect(state => ({ heroes: state.heroes }))(ListContainer);
