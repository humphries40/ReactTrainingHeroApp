import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import HeroList from '../components/HeroList';

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.getHero = this.getHero.bind(this);
        // this.addUser = this.addUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
    }

    init(list) {
        let {dispatch} = this.props;
        dispatch({ type: 'INIT', heroes: list });
    }

    getHero(id = null) {
        let {dispatch, router, heroes} = this.props;
        let hero = id === null ? defaultHero() : heroes.filter(h => h.uuid === id)[0];
        dispatch({ type: "GET", hero: hero });
        router.push(`/hero/${id === null ? '' : id}`);
    }

    // addUser(user) { 
    //   let {dispatch} = this.props;
    //   dispatch({ type: 'ADD', user: {name: user.name, email: user.email}});
    // }

    // deleteUser(event) {
    //   let id = event.target.className;
    //   let {dispatch} = this.props;
    //   dispatch({ type: 'DELETE', id: id});
    // }

    componentDidMount() {
        const jq = require('jquery');
        if (this.props.heroes.length === 0) {
            jq.getJSON('https://ce3rt0e0yl.execute-api.us-east-1.amazonaws.com/prod/abbHeros', (data) => this.init(data));
        }
    }

    render() {
        return (<div>
            <HeroList heroes={this.props.heroes} getHero={this.getHero} />
        </div>
        );
    }
}

export default connect(state => ({ heroes: state.heroes }))(ListContainer);
