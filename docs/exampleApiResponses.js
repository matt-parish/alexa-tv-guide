let sessionResponse = { 
  score: 1.9450382,
  show: 
   { 
    id: 2950,
    url: 'http://www.tvmaze.com/shows/2950/the-great-british-bake-off',
    name: 'The Great British Bake Off',
    type: 'Game Show',
    language: 'English',
    genres: [ 'Food' ],
    status: 'Running',
    runtime: 60,
    premiered: '2010-08-17',
    schedule: { 
      time: '20:00', 
      days: [ 'Wednesday' ] 
    },
    rating: { average: 9.1 },
    weight: 0,
    network: { id: 45,
       name: 'Channel 4',
       country: { name: 'United Kingdom', code: 'GB', timezone: 'Europe/London' } 
    },
    webChannel: null,
    externals: { tvrage: 26332, thetvdb: 184871, imdb: 'tt1877368' },
    image: { 
      medium: 'http://tvmazecdn.com/uploads/images/medium_portrait/16/40349.jpg',
      original: 'http://tvmazecdn.com/uploads/images/original_untouched/16/40349.jpg' 
    },
    summary: '<p><em>The Great British Bake Off</em> sees ten passionate home bakers take part in a bake-off to test every aspect of their baking skills as they battle to be crowned the Great British Bake Off\'s best amateur baker. Each week the nationwide tour sees keen bakers put through three challenges in a particular discipline. The competition kicks off with cake in the Cotswolds, then moves to Scotland to tackle biscuit baking, then Sandwich in Kent for bread, Bakewell in Derbyshire for puddings, Mousehole in Cornwall for the pastry challenges, and London for the grand final. Judging the baking are renowned baking writer Mary Berry and professional baker Paul Hollywood; presenting the show are Mel Giedroyc and Sue Perkins, who trace the very particular history of British baking by visiting local baking landmarks and discovering why people bake what they bake today.</p>',
    updated: 1478894723,
    _links: { 
      self: { href: 'http://api.tvmaze.com/shows/2950' },
      previousepisode: { href: 'http://api.tvmaze.com/episodes/904687' } 
    } 
  }
};

let previousEpisode = {
  "id": 904687,
  "url": "http://www.tvmaze.com/episodes/904687/the-great-british-bake-off-7x10-the-final",
  "name": "The Final",
  "season": 7,
  "number": 10,
  "airdate": "2016-10-26",
  "airtime": "20:00",
  "airstamp": "2016-10-26T20:00:00+01:00",
  "runtime": 60,
  "image": {
    "medium": "http://tvmazecdn.com/uploads/images/medium_landscape/82/205565.jpg",
    "original": "http://tvmazecdn.com/uploads/images/original_untouched/82/205565.jpg"
  },
  "summary": "<p>It is the final, and with just three of the original twelve bakers remaining. The theme for the final is a Royal Bake Off, as the tent plays host to three challenges to impress the Queen.</p><p>The last signature<span> challenge sees a return to meringues, a challenge that a few of the bakers stumbled over in week six.</span></p><p>For the technical challenge, Mary has made a simple bake very, very tough, as she has only given the bakers one recipe instruction. The rest is down to them. It may be a very British classic, but with no measurements, this is the ultimate test of the final three bakers' intuition.</p><p>Then on the final day, as the bakers' families gather outside the tent, the finalists face their last showstopper. This is the most complex one ever seen on Bake Off, and there are the most bakes ever requested in a challenge. With only one oven, it's five solid hours of baking for the finalists to prove they deserve the winner's trophy.</p><p>Who will be named the winner of The Great British Bake Off 2016?</p>",
  "_links": {
    "self": {
      "href": "http://api.tvmaze.com/episodes/904687"
    }
  }
};
let omdbResponse = {
  Title: 'The Great British Baking Show',
  Year: '2010–',
  Rated: 'N/A',
  Released: '17 Aug 2010',
  Runtime: '60 min',
  Genre: 'Reality-TV',
  Director: 'N/A',
  Writer: 'N/A',
  Actors: 'Mary Berry, Paul Hollywood, Mel Giedroyc, Sue Perkins',
  Plot: 'Bakers attempt three challenges each week trying to impress the judges enough to go through to the next round and eventually are crowned Britain\'s best amateur baker.',
  Language: 'English',
  Country: 'UK',
  Awards: '7 wins & 9 nominations.',
  Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTg4NjI1MDY1OF5BMl5BanBnXkFtZTgwMzIwOTcwMzE@._V1_SX300.jpg',
  Metascore: 'N/A',
  imdbRating: '8.6',
  imdbVotes: '1,627',
  imdbID: 'tt1877368',
  Type: 'series',
  totalSeasons: '7',
  Response: 'True'
};


let eastenders = {
  id: 793,
  url: 'http://www.tvmaze.com/shows/793/eastenders',
  name: 'EastEnders',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama'],
  status: 'Running',
  runtime: 30,
  premiered: '1985-02-19',
  schedule: {
    time: '',
    days: ['Monday', 'Tuesday', 'Thursday', 'Friday']
  },
  rating: {
    average: 10
  },
  weight: 0,
  network: {
    id: 12,
    name: 'BBC One',
    country: {
      name: 'United Kingdom',
      code: 'GB',
      timezone: 'Europe/London'
    }
  },
  webChannel: null,
  externals: {
    tvrage: 3418,
    thetvdb: 71753,
    imdb: 'tt0088512'
  },
  image: {
    medium: 'http://tvmazecdn.com/uploads/images/medium_portrait/6/15519.jpg',
    original: 'http://tvmazecdn.com/uploads/images/original_untouched/6/15519.jpg'
  },
  summary: '<p>Set in the East End of London, the show focuses on the tensions between love and family with stories ranging from hard-hitting social issues, to personal, human tragedies. And there\'s plenty of funny moments too. <br /><br /> Classic characters old and new across thousands of episodes have shared a drink in The Queen Vic, shed tears of despair or joy, sat on Arthur\'s bench in the Square... and at some point or other they probably crossed paths with Ian Beale.</p>',
  updated: 1478975133,
  _links: {
    self: {
      href: 'http://api.tvmaze.com/shows/793'
    },
    previousepisode: {
      href: 'http://api.tvmaze.com/episodes/980392'
    },
    nextepisode: {
      href: 'http://api.tvmaze.com/episodes/986464'
    }
  }
};
let eastendersNext = {
  "id": 986464,
  "url": "http://www.tvmaze.com/episodes/986464/eastenders-32x182-14112016",
  "name": "14/11/2016",
  "season": 32,
  "number": 182,
  "airdate": "2016-11-14",
  "airtime": "20:00",
  "airstamp": "2016-11-14T20:00:00+00:00",
  "runtime": 30,
  "image": null,
  "summary": "<p>Masood makes a big decision. One resident faces an upsetting reality.</p>",
  "_links": {
    "self": {
      "href": "http://api.tvmaze.com/episodes/986464"
    }
  }
};

let eastendersPrev = {
  "id": 980392,
  "url": "http://www.tvmaze.com/episodes/980392/eastenders-32x181-11112016",
  "name": "11/11/2016",
  "season": 32,
  "number": 181,
  "airdate": "2016-11-11",
  "airtime": "20:00",
  "airstamp": "2016-11-11T20:00:00+00:00",
  "runtime": 30,
  "image": null,
  "summary": "<p>Denise receives some surprising news from Zainab. Belinda is left to wonder about what could have been. Will struggles with what he has witnessed. </p>",
  "_links": {
    "self": {
      "href": "http://api.tvmaze.com/episodes/980392"
    }
  }
};
