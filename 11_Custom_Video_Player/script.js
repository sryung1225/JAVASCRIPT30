// 커스텀 비디오 플레이어 만들기
// - 화면 누르면 재생/정지 동작하기
// - 재생 버튼 누르면 재생/정지 동작하기
// -----------------------------------------------------

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');

// 비디오 재생 토글
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);
