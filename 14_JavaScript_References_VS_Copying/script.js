// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2); // ? 100 100
age = 200;
console.log(age, age2); // ? 200 100

let name = 'Wes';
let name2 = name;
console.log(name, name2); // ? Wes Wes
name = 'wesley';
console.log(name, name2); // ? wesley Wes

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players;
console.log(players, team); // ? ['Wes', 'Sarah', 'Ryan', 'Poppy'] ['Wes', 'Sarah', 'Ryan', 'Poppy']

// You might think we can just do something like this:
team[3] = 'Lux';
console.log(players, team); // ? ['Wes', 'Sarah', 'Ryan', 'Lux'] ['Wes', 'Sarah', 'Ryan', 'Lux']

// however what happens when we update that array?
// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
const team2 = players.slice();
// one way
const team3 = Array.from(players);
// or create a new array and concat the old one in
const team4 = [].concat(players);
// or use the new ES6 Spread
const team5 = [...players];

// now when we update it, the original one isn't changed
team5[3] = 'heeee hawww';
console.log(players, team5); // ? ['Wes', 'Sarah', 'Ryan', 'Lux'] ['Wes', 'Sarah', 'Ryan', 'heeee hawww']

// The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
  name: 'Wes Bos',
  age: 80,
};

// and think we make a copy:
const captain = person;
console.log(person, captain); // ? {name: 'Wes Bos', age: 80} {name: 'Wes Bos', age: 80}
captain.number = 99;
console.log(person, captain); // ? {name: 'Wes Bos', age: 80, number: 99} {name: 'Wes Bos', age: 80, number: 99}

// how do we take a copy instead?
const captain2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(person, captain2); // ? {name: 'Wes Bos', age: 80, number: 99} {name: 'Wes Bos', age: 12, number: 99}

// We will hopefully soon see the object ...spread
const captain3 = { ...person };

// Things to note
// this is only 1 level deep - both for Arrays and Objects.
// lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
  name: 'Wes',
  age: 100,
  social: {
    twitter: '@wesbos',
    facebook: 'wesbos.developer',
  },
};
console.log(wes); // ? {name: 'Wes', age: 100, social: {…}}

const dev = Object.assign({}, wes);
const dev2 = JSON.parse(JSON.stringify(wes));
