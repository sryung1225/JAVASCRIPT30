// 검색어에 해당하는 데이터 자동 완성하기
// -
// -----------------------------------------------------
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    cities.push(...data);
    console.log(cities); // ? (1000) [{…}, ...]
  })
  .catch((error) => console.error("못 가져 왔담"));
