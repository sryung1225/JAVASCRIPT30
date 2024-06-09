// 커스텀 비디오 플레이어 만들기
// - 화면 누르면 재생/정지 동작
// - 재생 버튼 누르면 재생/정지 동작
// - 재생 진행 바 표시
// - 재생 진행 바 클릭 시 해당 구간으로 점프
// - 재생 진행 바 드래그 시 해당 구간으로 이동
// - 앞/뒤 스킵 버튼 누르면 현재 기준으로 구간 이동
// - 볼륨/재생속도 게이지 조절
// -----------------------------------------------------

// 요소들 선언
const player = document.querySelector('.player') as HTMLDivElement;
const video = player.querySelector('.viewer') as HTMLVideoElement;
const toggle = player.querySelector('.toggle') as HTMLButtonElement;
const progress = player.querySelector('.progress') as HTMLDivElement;
const progressBar = player.querySelector('.progress__filled') as HTMLDivElement;
const skipButtons = player.querySelectorAll(
  '[data-skip]',
) as NodeListOf<HTMLButtonElement>;
const ranges = player.querySelectorAll(
  '.player__slider',
) as NodeListOf<HTMLInputElement>;

// 1. 비디오 재생/정지 토글
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(this: HTMLVideoElement) {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

// 2. 비디오 진행 바 표시 & 조절
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e: MouseEvent) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub); // 클릭 구간으로 점프
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // 드래그 인식
progress.addEventListener('mouseup', () => (mousedown = false));

// 3. 비디오 앞 뒤 구간 스킵
function skip(this: HTMLButtonElement) {
  const skipValue = this.dataset.skip;
  if (skipValue) {
    video.currentTime += parseFloat(skipValue);
  }
}

skipButtons.forEach((button) => button.addEventListener('click', skip));

// 4. 볼륨(volum) & 재생속도(playbackRate) 값 조절
function handleRangeUpdate(this: HTMLInputElement) {
  const range = this.name;
  if (range === 'volume' || range === 'playbackRate') {
    video[range] = Number(this.value);
  }
}

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate),
);
