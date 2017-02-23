import React from 'react';
import ReactDOM from 'react-dom';
import { HeroURI, EVENTS } from '../config/settings'
import { Link } from 'react-router'

export default class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getState = this.getState.bind(this);
    this.GroupTemplate = this.GroupTemplate.bind(this);
    this.state = this.getState(this.props)
  }

  getState(props) {
    return Object.assign({}, props.hero);
  }

  handleChange(event) {
    const newState = {
      uuid: this.refs.uuid.value,
      realName: this.refs.realName.value,
      heroName: this.refs.heroName.value,
      powers: this.refs.powers.value,
      s3ImageUrl: this.refs.s3ImageUrl.value,
      signedAccords: this.refs.signedAccords.value,
      abilities: {
        fightingSkills: this.refs.fightingSkills.value,
        strength: this.refs.strength.value,
        durability: this.refs.durability.value,
        energyProjection: this.refs.energyProjection.value,
        speed: this.refs.speed.value,
        intelligence: this.refs.intelligence.value
      },
      groups: this.state.groups,
    };

    this.setState(newState);
  }

  handleSubmit(event) {
    let hero = this.state
    event.preventDefault();
    this.props.updateHero(this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  }

  GroupTemplate(groups) {
    let grouplist = [];

    for (var i = 0; i < groups.length; i++) {
      grouplist.push(<div className="col col-lg-2">
        {/*<img src={groups[i].s3ImageUrl} />*/}
      <Link to={`/group/${groups[i]}`}>{groups[i]}</Link>
      </div>)
    }
    return (<div className="row">
        {grouplist}
      </div>
    )
  }

  render() {
    return <div>
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group row">
            <h1 className="pull-left">{this.state.heroName}</h1>
            <button type="submit" className="btn btn-primary pull-right">Update Hero</button>
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
                <label htmlFor="heroName">Hero Name</label>
                <input type="text" className="form-control" onChange={this.handleChange} ref="heroName" id="heroName" value={this.state.heroName} />
              </div>
            </div>
            <div className="col col-lg-3">
              <div className="form-group">
                <label htmlFor="realName">Real Name</label>
                <input type="text" className="form-control" onChange={this.handleChange} ref="realName" id="realName" value={this.state.realName} />
              </div>
            </div>
            <div className="col col-lg-3">
              <div className="form-group">
                <label htmlFor="signedAccords">Signed the Sokovia Accords</label>
                <select className="form-control" onChange={this.handleChange} ref="signedAccords" id="signedAccords" value={this.state.signedAccords}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="powers">Description of Powers</label>
                <textarea className="form-control" onChange={this.handleChange} ref="powers" id="powers" rows="7" value={this.state.powers} />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col col-lg-4">
              <div className="form-group">
                <label htmlFor="durability">Durability</label>
                <input type="number" className="form-control" onChange={this.handleChange} ref="durability" id="durability" value={this.state.abilities.durability} />
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="form-group">
                <label htmlFor="energyProjection">Energy Projection</label>
                <input type="number" className="form-control" onChange={this.handleChange} ref="energyProjection" id="energyProjection" value={this.state.abilities.energyProjection} />
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="form-group">
                <label htmlFor="fightingSkills">Fighting Skills</label>
                <input type="number" className="form-control" onChange={this.handleChange} ref="fightingSkills" id="fightingSkills" value={this.state.abilities.fightingSkills} />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col col-lg-4">
              <div className="form-group">
                <label htmlFor="intelligence">Intelligence</label>
                <input type="number" className="form-control" onChange={this.handleChange} ref="intelligence" id="intelligence" value={this.state.abilities.intelligence} />
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="form-group">
                <label htmlFor="speed">Speed</label>
                <input type="number" className="form-control" onChange={this.handleChange} ref="speed" id="speed" value={this.state.abilities.speed} />
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="form-group">
                <label htmlFor="strength">Strength</label>
                <input type="number" className="form-control" onChange={this.handleChange} ref="strength" id="strength" value={this.state.abilities.strength} />
              </div>
            </div>            
          </div>
          {this.GroupTemplate(this.state.groups)}
        </form>
      </div>
    </div>;
  }
}