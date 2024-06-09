// 코나미 커맨드
// - cornify_add() 실행 시 브라우저에 랜덤한 이미지 렌더링되도록 기본 설정된 상태
// - 'show' 타이핑 시 cornify_add() 실행
// -----------------------------------------------------
const pressed = [];
const secretCode = 'show';

window.addEventListener('keyup', (e) => {
  // console.log(e.key); // ? s

  pressed.push(e.key);
  // console.log(pressed); // ? ['s', 'h', 'o', 'w', 's']

  // pressed 배열이 최대 secretCode의 크기 만큼만 차지하면서 최신 값 저장
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  // console.log(pressed); // ? ['h', 'o', 'w', 's']

  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!');
    cornify_add(); // 그림 그리는 명령어 실행
  }
});
