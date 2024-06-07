// 개발자 도구 명령어 알아보기
// - dir: DOM 요소의 속성을 트리 구조로 출력
// - table: 데이터를 테이블 형식으로 출력
// - assert : 첫 번째 인수가 false로 평가되면 오류 메세지 출력
// - groupCollapsed : 그룹을 접은 상태로 시작
// - groupEnd : 그룹 종료
// - count : 특정 레이블이 나타난 횟수 출력
// - time : 타이머 시작
// - timeEnd : 타이머 종료 & 소요된 시간 출력
// -----------------------------------------------------

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('hello');
// ? hello

// Interpolated
console.log('Hello I an a %s string!', '💩');
// ? Hello I an a 💩 string!

// Styled
console.log(
  '%c 얏호',
  'font-size:50px; background-color:gray; text-shadow: 5px 5px 0 white',
);

// Warning!
console.warn('OH NOOO');
// ? ⚠️ OH NOOO

// Error
console.error('Shit!');
// ? 🚨 Shit!

// Info
console.info('Crocodiles eat 3-4 people per year');
// ? Crocodiles eat 3-4 people per year

// Testing
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'That is wrong!');
// ? 🚨 어설션에 실패함: That is wrong!

// Clearing
console.clear();
// ? 콘솔 삭제됨

// Viewing DOM Elements
console.log(p);
console.dir(p);
// ? p
// accessKey: ""
// align: ""
// ariaAtomic: null
// ...

const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'hugo', age: 8 },
];

// Grouping together
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
// ? Snickers
// This is Snickers
// Snickers is 2 years old
// Snickers is 14 dog years old
// ? hugo
// This is hugo
// hugo is 2 years old
// hugo is 14 dog years old

// Counting
console.count('Wes'); // ? Wes: 1
console.count('Wes'); // ? Wes: 2
console.count('Steve'); // ? Steve: 1
console.count('Steve'); // ? Steve: 2
console.count('Wes'); // ? Wes: 3
console.count('Steve'); // ? Steve: 3

// Timing
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd('fetching data');
    console.log(data);
  });
// ? fetching data: 38.925048828125 ms
// ? {login: 'wesbos', id: 176013, node_id: 'MDQ6VXNlcjE3NjAxMw==', avatar_url: 'https://avatars.githubusercontent.com/u/176013?v=4', gravatar_id: '', …}

console.table(dogs);
// dogs에 대한 테이블 출력
// 위에서 진행된 fetching에서 시간 소모가 있기 때문에 테이블이 우선 출력됨
