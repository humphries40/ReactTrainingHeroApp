import { defaultHero, defaultHeroes, EVENTS, URI } from '../config/settings';

const initialState = {
  heroes: defaultHeroes(),
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
    default:
      return state;
  }
}

function updateHero(state, hero) {
  var request = new XMLHttpRequest();
  request.open('POST', URI, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(hero));
}