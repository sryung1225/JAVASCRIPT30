// 음석 메모장
// - 웹앱에서 음성 인식을 지원하는 Web Speech API
// - SpeechRecognition을 이용한 실시간 음성 인식
// - 음성 인식 결과 텍스트를 회차마다 한 줄로 화면 렌더링
// -----------------------------------------------------

// 음성 인식을 위한 인터페이스 SpeechRecognition
// 브라우저가 SpeechRecognition를 지원하지 않는 경우를 방어하기 위한 webkitSpeechRecognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = false; // 회차 중 중간 결과 반환 (= 글자 하나하나마다 result 동작)
recognition.lang = 'ko-KR'; // 인식 언어 설정 (영어: en-US)

// 인식 결과를 표시할 영역 생성
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// result 이벤트 핸들러 함수 정의
function handleResult(e) {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  // console.log(transcript); // ? "안녕하세요"
  p.textContent = transcript;

  // console.log(e.results[0].isFinal);
  // false 였다가 음성 종료되면 true로 변환됨 (= 회차 종료)
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p); // 화면 렌더링
  }
}

recognition.addEventListener('result', handleResult); // 음성 인식되면 동작
recognition.addEventListener('end', recognition.start); // 음성 인식 종료되면 해당 회차 종료 후 재시작

recognition.start(); // 음성 인식 시작
