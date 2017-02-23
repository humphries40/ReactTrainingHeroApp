import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Group from '../components/Group';
import { GroupURI, defaultGroup, EVENTS } from '../config/settings'

class GroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
  }

  init(data) {
    const { dispatch, params} = this.props;
    const group = params.id ? data.filter(g => g.uuid === params.id)[0] : defaultGroup();
    dispatch({ type: EVENTS.GET_GROUP, group: group });
  }

  componentDidMount() {
    $.getJSON(GroupURI, ((data) => this.init(data)));
  }

  updateGroup(updatedGroup) {
    const {dispatch, router} = this.props;
    dispatch({ type: EVENTS.EDIT_GROUP, group: updatedGroup });
  }

  render() {
    return (<div>
      <Group group={this.props.group} params={this.props.params} updateGroup={this.updateGroup} />
    </div>
    );
  }
}

export default connect(state => ({ group: state.group }))(GroupContainer);




