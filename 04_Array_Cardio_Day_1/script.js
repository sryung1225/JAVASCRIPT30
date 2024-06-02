// 데이터를 json으로 분리하고 따로 데이터 가져오기 수행
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const inventors = data.inventors;
    const people = data.people;

    born1500s(inventors);
  })
  .catch((error) => console.error("못 가져 왔담"));

// 1. 1500년대에 태어난 inventors만 나열하기
function born1500s(inventors) {
  console.log("하이", inventors.length);
}

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?

// 5. Sort the inventors by years lived

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// 7. sort Exercise
// Sort the people alphabetically by last name

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
];
