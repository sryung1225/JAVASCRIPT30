// key 이벤트 관련 동작
// - 특정 키를 누르면 소리가 나도록
// - 특정 버튼을 누르면 소리가 나도록
// - 특정 키를 누르면 스타일이 변화하도록 (스타일 클래스 토글)
// -----------------------------------------------------

function playSound(e) {
  // keydown된 키의 keyCode 혹은 click된 버튼의 data-key 값
  let keyCode = 0;
  if (e.type === "keydown") keyCode = e.keyCode;
  else if (e.type === "click")
    // 이벤트 버블링으로 인해 click이 발생한 요소의 상위 요소 중 가장 가까운 button을 찾는 closest 메서드 활용
    keyCode = parseInt(e.target.closest("button").getAttribute("data-key"), 10);
  console.log("얍!", keyCode, e.type);

  // keyCode값과 동일한 audio 요소 확인 : audio
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  // console.log(audio); // ? <audio data-key="70" src="sounds/openhat.wav"></audio>
  // keyCode값과 동일한 button 요소 확인 : key
  const key = document.querySelector(`button[data-key="${keyCode}"]`);

  if (!audio || !key) return; // 없으면 무시

  audio.currentTime = 0;
  audio.play(); // 소리 재생
  key.classList.add("playing"); // 스타일을 위한 클래스 추가
}

// keydown 이벤트 부여
window.addEventListener("keydown", playSound);

const keys = document.querySelectorAll("button");
keys.forEach((key) => {
  // 모든 key들에 대해 transition 속성이 종료되면 (0.07s) 이벤트가 발생하도록
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return; // 없으면 무시
    key.classList.remove("playing"); // 스타일 초기화를 위한 클래스 제거
  });

  // 모든 key들에 대해 click 이벤트 부여
  key.addEventListener("click", playSound);
});
