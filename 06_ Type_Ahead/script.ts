// 검색어에 해당하는 데이터 자동 완성하기
// - json 파일을 이용하여 데이터 fetch
// - 검색어가 포함되는 데이터를 찾는 수단으로 정규표현식 활용
// - 검색어와 일치하는 부분을 표시하는 수단으로 정규표현식 활용
// - 숫자 데이터 포맷팅
// -----------------------------------------------------
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

// 타입 지정
interface City {
  city: string;
  state: string;
  population: number;
}

const cities: City[] = [];
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    cities.push(...data);
    // console.log(cities); // ? (1000) [{…}, ...]
  })
  .catch((error) => console.error("못 가져 왔담"));

function findMatches(wordToMatch: string, cities: City[]) {
  // 검색어(wordToMatch)가 city 혹은 state에 존재하는 경우를 필터링
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    // g: global. 문자열의 전체를 탐색
    // i: ignore case. 대/소문자 구분 없이 탐색
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x: number) {
  // 숫자 데이터를 갖고 3의 자리마다 ,가 존재하는 문자열로 변환
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches(this: HTMLInputElement) {
  // console.log(this.value); // 검색어

  // findMatches를 통해 나온 결과를 화면에 렌더링
  const matchArray = findMatches(this.value, cities);
  const regex = new RegExp(this.value, "gi");
  const html = matchArray
    .map((place) => {
      // 검색어와 일치하는 부분을 강조하기 위해 i.hl로 감싼 요소로 replace
      const cityName = place.city.replace(
        regex,
        `<i class="hl">${this.value}</i>`
      );
      const stateName = place.state.replace(
        regex,
        `<i class="hl">${this.value}</i>`
      );
      // li로 `cityName, stateName`와 인구수를 감싸서 출력
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
  `;
    })
    .join(""); // matchArray.map() 한 결과는 배열이므로 join("")을 통해 문자열화
  suggestions.innerHTML = html; // suggestions 내부에 html 요소로 삽입
}

const searchInput = document.querySelector("input.search") as HTMLInputElement;
const suggestions = document.querySelector("ul.suggestions") as HTMLDivElement;

// searchInput.addEventListener("change", displayMatches); // input 입력 후 focus 벗어날 때에만 포착
searchInput.addEventListener("keyup", displayMatches); // input 입력 모든 순간 포착
