import { defaultHero, defaultHeroes, EVENTS } from '../config/settings';

const initialState = {
  heroes: defaultHeroes(),
  hero: defaultHero()
}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "INIT":
      return Object.assign(newState, { heroes: action.heroes });
    case "EDIT":
      return Object.assign(newState, { heroes: updateHero(state, action.hero) });
    case "GET":
      return Object.assign(newState, { hero: action.hero });
    default:
      return state;
  }
}

function updateHero(state, hero) {
  let oldUsers = state.heroes;
  let returnValue = Object.assign([], oldUsers);

  const newHero = {
    name: hero.name,
    email: hero.email
  };

  if (isNaN(hero.id)) {
    returnValue.push(newHero);
  } else {
    returnValue[hero.id] = newHero;
  }

  return returnValue;
}