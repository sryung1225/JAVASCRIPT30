// 이벤트 버블링과 캡쳐링
// - 중첩된 요소들 divs를 갖고 버블링과 캡쳐링을 이해
// - 버블링: 이벤트가 가장 안쪽 요소에서 시작해서 최상위 요소로 전파되는 방식
// -----------------------------------------------------
const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this.classList.value);
  // 가장 바깥(one)을 누르면 ? one
  // 가장 안쪽(three)을 누르면 ? three two one
}

// div에 부여된 이벤트리스너는 기본적으로 버블링 단계에서 실행함 (capture: false)
divs.forEach((div) => div.addEventListener('click', logText));

// document.body.addEventListener('click', logText);
// 가장 안쪽(three)을 누르면 ? three two one bod
