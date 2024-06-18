// 시간 합산하고 표현하기
// - 각 <li data-time="" /> 에 입력된 data-time 값 합산
// - 합산된 초를 갖고 시/분/초 계산
// -----------------------------------------------------

const timeNodes = Array.from(
  document.querySelectorAll('[data-time]'),
) as HTMLElement[];
console.log(timeNodes); // ? [li, li, ...]

// 모든 timeNodes의 data-time에 입력된 초의 합산 계산
const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    if (!timeCode) return 0;
    const [mins, secs] = timeCode.split(':').map(Number);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds, 0);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
