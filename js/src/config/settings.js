const HeroURI = 'https://ce3rt0e0yl.execute-api.us-east-1.amazonaws.com/prod/abbHeros',
  GroupURI = 'https://ce3rt0e0yl.execute-api.us-east-1.amazonaws.com/prod/abbHeroGroups',
  SkillURI = 'https://ce3rt0e0yl.execute-api.us-east-1.amazonaws.com/prod/abbSkills',
  EVENTS = {
    LIST: 'LIST_HEROS',
    LIST_GROUPS: 'LIST_GROUPS',
    GET_HERO: 'GET_HERO',
    EDIT_HERO: 'EDIT_HERO',
    GET_GROUP: 'GET_GROUP',
    EDIT_GROUP: 'EDIT_GROUP'
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
  },
  _groups = [],
  _group = {
    "uuid": '',
    "location": "",
    "description": "",
    "name": "",
    "s3ImageUrl": ""
  };

function defaultHero() { return Object.assign({}, _hero); }
function defaultHeroes() { return Object.assign([], _heroes); }
function defaultGroups() { return Object.assign([], _groups); }
function defaultGroup() { return Object.assign({}, _group); }

export { HeroURI, GroupURI, EVENTS, defaultHero, defaultHeroes, defaultGroups, defaultGroup };