// 그림판 만들기
// - 반응형 캔버스 크기
// - 마우스 좌표를 연속적으로 저장하면서 그림 그리기
// -----------------------------------------------------

const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth; // 윈도우 창 너비
canvas.height = window.innerHeight; // 윈도우 창 높이
// 윈도우 창을 모두 캔버스 크기로 지정 (= 반응형)

// 그림을 그릴 캔버스 인식
const ctx = canvas.getContext('2d');
// 붓 환경 설정
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false; // 붓 활성화 유무
let [lastX, lastY] = [0, 0]; // 붓의 이전 좌표

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath(); // 선 그리기를 위한 시작 명령어
  ctx.moveTo(lastX, lastY); // 붓의 이전 좌표를 선의 시작점으로 설정
  ctx.lineTo(e.offsetX, e.offsetY); // 현재 좌표까지 선 그리기
  ctx.stroke(); // 선 화면에 렌더링
  [lastX, lastY] = [e.offsetX, e.offsetY]; // 현재 붓의 좌표 저장
}

// 마우스를 누르고 있을 때에만 그림을 그리도록 붓을 조절
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // 붓의 시작점 지정
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
