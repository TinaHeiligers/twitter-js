const _ = require('lodash');//gives us some awesome functionality so that we can use a locally created and modyfiable array as our data storage option.


var data = [];
var counter = 0;
function add (x, y) {
  counter++;
  data.push({ id: counter.toString(), name: x, content: y });
}

function list () {
  return _.cloneDeep(data);//creates a deep copy of the original object to work with/on. This ensures we don't modify our original data store.
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

//exporting the functions above to the app
module.exports = { add: add, list: list, find: find };

//creating random data to store in our data store (array).
const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

//ask why do we export the .add() function again but this time with parameters?
for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

console.log(data);