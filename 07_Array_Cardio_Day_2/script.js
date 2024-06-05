// 데이터를 json으로 분리하고 따로 데이터 가져오기 수행
const endpoint = './data.json';
const people = [];
const comments = [];
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    people.push(...data.people);
    comments.push(...data.comments);
    // console.log(people); // ? (4) [{…}, {…}, {…}, {…}]
    // console.log(comments); // ? (5) [{…}, {…}, {…}, {…}, {…}]
  })
  .catch((error) => console.error('못 찾았담'));

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

// Array.prototype.findIndex()
