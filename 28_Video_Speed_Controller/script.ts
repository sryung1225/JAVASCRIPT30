// 영상 재생 속도 컨트롤러
// 게이지 바 안에서 마우스가 움직이는대로 영상 재생 속도를 조절
// 11_Custom_Video_Player의 기능 중 하나
// -----------------------------------------------------
{
  const speed = document.querySelector('.speed') as HTMLDivElement;
  const bar = speed.querySelector('.speed-bar') as HTMLDivElement;
  const video = document.querySelector('.flex') as HTMLVideoElement;

  function handleMove(this: HTMLDivElement, e: MouseEvent) {
    const y = e.pageY - this.offsetTop; // y 좌표
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(2) + '×'; // 소수점 아래 2자리로 고정
    video.playbackRate = playbackRate; // 비디오 재생속도(playbackRate) 조절
  }

  speed.addEventListener('mousemove', handleMove);
}
