"use strict";
// TTS
// - 주어진 텍스트를 소리로 바꿔주는 Web Speech API의 하나인 SpeechSynthesis API
// - Speak 버튼을 통해 말하기 : speak()
// - Stop 버튼을 통해 말하기 취소하기 : cancel()
// - 음성 목소리 설정하기 : voices.getVoices()
// - 음성 옵션 조절하기 : text / rate / pitch
// -----------------------------------------------------
{
    const msg = new SpeechSynthesisUtterance(); // 인스턴스 msg
    // 생성된 SpeechSynthesisUtterance 인스턴스는 speak()를 사용할 수 있음
    let voices = [];
    const voicesDropdown = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="text"]');
    const speakButton = document.querySelector('#speak');
    const stopButton = document.querySelector('#stop');
    const textarea = document.querySelector('[name="text"]');
    msg.text = textarea.value; // textarea의 value를 읽을 대상으로 지정
    // 목소리 선택 dropdown 만들기
    function populateVoices() {
        voices = this.getVoices(); // 사용 가능한 목소리 목록을 가져오기
        voicesDropdown.innerHTML = voices
            .filter((voice) => voice.lang.includes('ko')) // 한국어 목소리 필터링
            .map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
            .join('');
    }
    // 설정된 목소리로 셋팅 변경하기
    function setVoice() {
        msg.voice = voices.find((voice) => voice.name === this.value) || null;
        toggle(); // 목소리 변경 후 자동 재생
    }
    // 옵션(텍스트/음높이/속도) 조절
    function setOption() {
        console.log(this.name, this.value);
        // ? rate 1.7
        // ? pitch 1.6
        // ? text ㅋㅋㅋㅋ
        msg[this.name] = this.value;
        toggle(); // 옵션 조정 후 자동 재생
    }
    // 음성 재생여부 토글
    function toggle(startOver = true) {
        speechSynthesis.cancel();
        if (startOver) {
            speechSynthesis.speak(msg);
        }
    }
    speechSynthesis.addEventListener('voiceschanged', populateVoices);
    voicesDropdown.addEventListener('change', setVoice);
    options.forEach((option) => option.addEventListener('change', setOption));
    speakButton.addEventListener('click', () => toggle(true));
    stopButton.addEventListener('click', () => toggle(false));
}
