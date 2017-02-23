import React from 'react';
import ReactDOM from 'react-dom';
import { GroupURI, EVENTS } from '../config/settings'
import { Link } from 'react-router'

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getState = this.getState.bind(this);
    // this.getLocation = this.getLocation.bind(this);

    this.state = this.getState(this.props)
  }

  getState(props) {
    return Object.assign({}, props.group);
  }

  handleChange(event) {
    const newState = {
      uuid: this.refs.uuid.value,
      location: this.refs.location.value,
      description: this.refs.description.value,
      name: this.refs.name.value,
      s3ImageUrl: this.refs.s3ImageUrl.value,
    };

    this.setState(newState);
  }

  handleSubmit(event) {
    let group = this.state
    event.preventDefault();
    this.props.updateGroup(this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  }


  // getLocation(location) {
  //   let myOptions = {
  //     zoom: 17,
  //     center: location,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  //   let map = new google.maps.Map(document.getElementById("basic_map"), myOptions);
  //   let marker = new google.maps.Marker({
  //     position: location,
  //     map: map,
  //   });

  //   let geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ 'address': '1373 grandview ave. columbus ohio 43212' }, function (results, status) {
  //     initialize(results[0].geometry.location);
  //   });
  // }

  render() {
    return <div>
      <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group row">
            <h1 className="pull-left">{this.state.name}</h1>
            <Link to={`/heroList/${this.state.uuid}`} className="btn btn-primary pull-right">View Heroes in Group</Link>
            <button type="submit" className="btn btn-primary pull-right">Update Group</button>
          </div>
          <div className="form-group row">
            <div className="col"><img src={this.state.s3ImageUrl} /></div>
            <label htmlFor="s3ImageUrl">Image URL</label>
            <input type="text" className="form-control" onChange={this.handleChange} ref="s3ImageUrl" id="s3ImageUrl" value={this.state.s3ImageUrl} />
          </div>
          <div className="form-group row">
            <div className="col col-lg-3">
              <div className="form-group">
                <label htmlFor="uuid">UUID</label>
                <input type="text" className="form-control" onChange={this.handleChange} ref="uuid" id="uuid" value={this.state.uuid} />
              </div>
            </div>
            <div className="col col-lg-3">
              <div className="form-group">
                <label htmlFor="name">Group Name</label>
                <input type="text" className="form-control" onChange={this.handleChange} ref="name" id="name" value={this.state.name} />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" onChange={this.handleChange} ref="description" id="description" rows="7" value={this.state.description} />
              </div>
            </div>
          </div>
          {/*<div id="basic_map" style="width:320px;height:240px;"></div>*/}
          {/*{this.getLocation(this.state.location)}*/}
        </form>
      </div>
    </div>;
  }
}