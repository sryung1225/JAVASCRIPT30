// TTS
// - 주어진 텍스트를 소리로 바꿔주는 Web Speech API의 하나인 SpeechSynthesis API

// -----------------------------------------------------

const msg = new SpeechSynthesisUtterance(); // 인스턴스 msg
// 생성된 SpeechSynthesisUtterance 인스턴스는 speak()를 사용할 수 있음

let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
