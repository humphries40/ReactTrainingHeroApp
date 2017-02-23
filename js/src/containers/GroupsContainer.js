import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GroupList from '../components/GroupList';
import { GroupURI, defaultGroups, EVENTS } from '../config/settings'

class GroupsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init(list) {
        let {dispatch} = this.props;
        dispatch({ type: EVENTS.LIST_GROUPS, groups: list });
    }

    componentDidMount() {
        const jq = require('jquery');
        if (this.props.groups.length === 0) {
            jq.getJSON(GroupURI, (data) => this.init(data));
        }
    }

    render() {
        return (<div>
            <GroupList groups={this.props.groups} />
        </div>
        );
    }
}

export default connect(state => ({ groups: state.groups }))(GroupsContainer);
