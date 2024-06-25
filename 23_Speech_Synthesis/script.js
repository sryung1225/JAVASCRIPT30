// TTS
// - 주어진 텍스트를 소리로 바꿔주는 Web Speech API의 하나인 SpeechSynthesis API
// - Speak 버튼을 통해 말하기 : speak()
// - Stop 버튼을 통해 말하기 취소하기 : cancel()
// -----------------------------------------------------

const msg = new SpeechSynthesisUtterance(); // 인스턴스 msg
// 생성된 SpeechSynthesisUtterance 인스턴스는 speak()를 사용할 수 있음

let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value; // textarea의 value를 읽을 대상으로 지정

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
