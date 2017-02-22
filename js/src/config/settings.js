const URI = 'https://ce3rt0e0yl.execute-api.us-east-1.amazonaws.com/prod/abbHeros',
  EVENTS = {
    LIST: 'LIST_HEROS',
    GET_HERO: 'GET_HERO',
    EDIT_HERO: 'EDIT_HERO'
  },
  _heroes = [],
  _hero = {
    'abilities': {
      'fighting skills': 0,
      'strength': 0,
      'durability': 0,
      'energy projection': 0,
      'speed': 0,
      'intelligence': 0
    },
    'realName': '',
    's3ImageUrl': '',
    'powers': '',
    'uuid': '',
    'heroName': '',
    'signedAccords': '',
    'groups': []
  };

function defaultHero() { return Object.assign({}, _hero); }
function defaultHeroes() { return Object.assign([], _heroes); }

export { URI, EVENTS, defaultHero, defaultHeroes };