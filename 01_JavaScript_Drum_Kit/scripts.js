// key 이벤트 관련 동작
// - 특정 키를 누르면 소리가 나도록
// - 특정 키를 누르면 스타일이 변화하도록 (스타일 클래스 토글)

window.addEventListener("keydown", (e) => {
  // 이벤트 객체 및 눌리는 키의 keyCode 확인
  // console.log(e.keyCode); // ? 75

  // keyCode값과 동일한 audio 요소 확인 : audio
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  // console.log(audio); // ? <audio data-key="70" src="sounds/openhat.wav"></audio>

  // keyCode값과 동일한 div.key 요소 확인 : key
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio || !key) return; // 없으면 무시

  audio.currentTime = 0;
  audio.play(); // 소리 재생
  key.classList.add("playing"); // 스타일을 위한 클래스 추가
});

const keys = document.querySelectorAll(".key");
keys.forEach((key) =>
  // 모든 key들에 대해 transition 속성이 종료되면 (0.07s) 이벤트가 발생하도록
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return; // 없으면 무시
    key.classList.remove("playing"); // 스타일 초기화를 위한 클래스 제거
  })
);
