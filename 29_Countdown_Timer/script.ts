// 스탑워치
// - 20초/5분/15분/20분/60분 각 버튼을 클릭하면 해당 시간만큼 타이머 동작
// - 원하는 분(min)을 직접 입력하여 해당 시간만큼 타이머 동작
// - 잔여 시간 실시간 계산
// - 타임 아웃 예정 시간 계산
// - now = Date.now() : ms 단위로 계산된 현재 날짜
// - new Date(now) : 날짜 객체 (ex. Thu Jul 01 2024 01:40:53 GMT+0900 (한국 표준시))
// -----------------------------------------------------
{
  let countdown: NodeJS.Timeout;
  const timerDisplay = document.querySelector(
    '.display__time-left',
  ) as HTMLHeadElement;
  const endTime = document.querySelector(
    '.display__end-time',
  ) as HTMLParagraphElement;
  const buttons = document.querySelectorAll(
    '[data-time]',
  ) as NodeListOf<HTMLButtonElement>;

  // 타이머 시작 함수
  function startTimer(this: HTMLButtonElement) {
    const time = this.dataset.time; // 각 버튼의 data-time 값
    if (!time) return;
    const seconds: number = parseInt(time);
    timer(seconds);
  }

  // 타이머 동작 함수
  function timer(seconds: number) {
    // 타이머 초기화 : 이전에 존재하던 타이머가 있다면 제거
    if (countdown) clearInterval(countdown);

    // 남은 시간 노출 (최초)
    displayTimeLeft(seconds);

    // 종료 예정 시간 계산 후 노출
    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);

    // 남은 시간 노출 함수를 1초마다 반복 수행
    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // 잔여 시간 없는 경우 종료
      if (secondsLeft < 0) {
        clearInterval(countdown); // 타이머 초기화
        return; // 타이머 동작 종료
      }
      // 잔여 시간 있는 경우 화면 노출
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  // 남은 시간 카운팅
  function displayTimeLeft(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
  }

  // 종료 예정 시간 노출
  function displayEndTime(timestamp: number) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}에 타임 아웃!`;
  }

  // 각 시간 버튼에 이벤트 리스너 등록
  buttons.forEach((button) => button.addEventListener('click', startTimer));

  // 커스텀 시간 input에 이벤트 리스너 등록
  const customForm = document.querySelector(
    'form[name="customForm"]',
  ) as HTMLFormElement;
  const customInput = customForm.querySelector(
    'input[name="minutes"]',
  ) as HTMLInputElement;
  customForm.addEventListener(
    'submit',
    function (this: HTMLFormElement, e: Event) {
      e.preventDefault();
      const mins = this.minutes.value;
      if (!isNaN(mins)) {
        timer(mins * 60); // 분 => 초로 변환 후 동작
      }
      this.reset(); // input 비워주기
    },
  );
}
