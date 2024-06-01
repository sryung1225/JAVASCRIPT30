// 날짜 데이터와 반복 애니메이션
// - 현재 시간 데이터 가져오기
// - 시침, 분침, 초침이 반복적으로 움직이도록
// -----------------------------------------------------

const hourHand = document.querySelector(".hour-hand") as HTMLDivElement;
const minuteHand = document.querySelector(".minute-hand") as HTMLDivElement;
const secondHand = document.querySelector(".second-hand") as HTMLDivElement;

function setDate() {
  const time = new Date();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  // console.log(hours, minutes, seconds);

  // 시침, 분침, 초침 차례로 rotate transform 동작
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const secondsDegrees = (seconds / 60) * 360 + 90;

  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

setDate(); // 최초 실행
setInterval(setDate, 1000); // 이후 1초마다 반복 실행
