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
        // This can create a bunch of heroes locally if you want to test
        // your list's speed. Going to the details pages of these heroes is currently broken.
        // for (var i = 0; i < 100000; i++) {
        //     let numberMan = {
        //         'abilities': {
        //             'fighting skills': 1,
        //             'strength': 1,
        //             'durability': 1,
        //             'energy projection': 1,
        //             'speed': 1,
        //             'intelligence': 1
        //         },
        //         'realName': 'Man Number ' + i,
        //         's3ImageUrl': '',
        //         'powers': 'His power is in NUMBERS!',
        //         'uuid': 'numberman'+i,
        //         'heroName': 'NumberMan ' + i,
        //         'signedAccords': 'yes',
        //         'groups': []
        //     }
        //     list.push(numberMan);
        // }
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
