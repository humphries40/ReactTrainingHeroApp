import { defaultHero, defaultHeroes, defaultGroups, defaultGroup, EVENTS, HeroURI, GroupURI } from '../config/settings';

const initialState = {
  heroes: defaultHeroes(),
  groups: defaultGroups(),
  group: defaultGroup(),
  hero: defaultHero()
}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case EVENTS.LIST:
      return Object.assign(newState, { heroes: action.heroes });
    case EVENTS.EDIT_HERO:
      return Object.assign(newState, { hero: updateHero(state, action.hero) });
    case EVENTS.GET_HERO:
      return Object.assign(newState, { hero: action.hero });
    case EVENTS.LIST_GROUPS:
      return Object.assign(newState, { groups: action.groups });
    case EVENTS.EDIT_GROUP:
      return Object.assign(newState, { group: updateGroup(state, action.group) });
    case EVENTS.GET_GROUP:
      return Object.assign(newState, { group: action.group });
    default:
      return state;
  }
}

function updateHero(state, hero) {
  var request = new XMLHttpRequest();
  request.open('POST', HeroURI, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(hero));
}

function updateGroup(state, group) {
  var request = new XMLHttpRequest();
  request.open('POST', GroupURI, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(group));
}