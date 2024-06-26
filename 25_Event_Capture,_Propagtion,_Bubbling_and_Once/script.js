// 이벤트 버블링과 캡쳐링
// - 중첩된 요소들 divs를 갖고 버블링과 캡쳐링을 이해
// - 버블링: 이벤트가 가장 안쪽 요소에서 시작해서 최상위 요소로 전파되는 방식
// - 캡쳐링: 이벤트가 최상위 요소에서 시작해서 가장 안쪽 요소로 전파되는 방식
// -----------------------------------------------------
const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this.classList.value);
  // 가장 바깥(one)을 누르면 ? one
  // 가장 안쪽(three)을 누르면 ? one two three
}

// div에 부여된 이벤트리스너가 캡쳐링 단계에서 실행하도록 조정 (capture: true)
divs.forEach((div) =>
  div.addEventListener('click', logText, {
    capture: true,
  }),
);

// document.body.addEventListener('click', logText, { capture: true }));
// 가장 안쪽(three)을 누르면 ? bod one two three
