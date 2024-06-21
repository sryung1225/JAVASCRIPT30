// 나침반 만들기
// - 웹앱에서 사용자의 위치 파악을 지원하는 Geolocation API
// - 사용자의 위치 변화를 지속적으로 추적 : watchPosition
// -----------------------------------------------------
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

// 현재 위치 파악
navigator.geolocation.watchPosition(
  (data) => {
    console.log(data); // ? GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1719159387431}
    speed.textContent = data.coords.speed; // 사용자의 속도
    arrow.style.transform = `rotate(${data.coords.heading}deg)`; // 사용자의 방향 기준으로 낮침반 회전
  },
  (error) => {
    console.error(error);
  },
);
