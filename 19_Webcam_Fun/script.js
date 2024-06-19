// 실시간 웹캠 화면 구현
// - 사용자의 웹캠에 접근 : navigator.mediaDevices
// - 실시간 웹캠 영상 화면 렌더링
// - 순간 화면 캡쳐 및 저장
// - 필터 적용 : 빨강 / RGB 분리 / 크로마키
// -----------------------------------------------------

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const snap = document.querySelector('.snap'); // 촬영 시 들릴 효과음
const strip = document.querySelector('.strip'); // 갤러리

let isRedEffect = false;
let isRgbSplit = false;

// 사용자의 실시간 영상 가져오기
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    }) // 사용자의 미디어 장치(카메라)에 접근. Promise 객체 반환
    .then((localMediaStream) => {
      // 접근 성공 시, 실시간 비디오 객체 localMediaStream이 반환
      // console.log(localMediaStream); // ? MediaStream {id: '4324a780-0c39-4c6d-985c-e9da540d915b', active: true, onaddtrack: null, onremovetrack: null, onactive: null, …}
      video.srcObject = localMediaStream; // video에 실시간 비디오 객체 전달
      video.play(); // 재생
    })
    .catch((error) => {
      // 접근 실패 시, 에러 반환
      console.error('실시간 화면 가져오기 실패, error');
    });
}

// 캔버스에 영상 그리기
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // 일정 시간마다 화면 그리기
  return setInterval(() => {
    // 화면 그리기
    ctx.drawImage(video, 0, 0, width, height);

    // 필터 적용하기
    let pixels = ctx.getImageData(0, 0, width, height); // 캔버스 내 픽셀 데이터 가져오기
    if (isRedEffect) {
      pixels = redEffect(pixels); // 빨강 필터 적용
    }
    if (isRgbSplit) {
      pixels = rgbSplit(pixels); // RGB 분리 필터 적용
    }
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0); // 캔버스 내 픽셀 데이터 다시 그리기
  }, 16);
}

// 순간 촬영 + 하단 갤러리 저장
function takePhoto() {
  // 촬영 효과음
  snap.currentTime = 0;
  snap.play();

  // 캔버스 데이터(=순간 이미지) 저장
  const data = canvas.toDataURL('image/jpeg'); // base64 형태
  // 하단에 갤러리 형태로 나열 + 클릭 시 이미지 저장
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', '캡쳐');
  link.innerHTML = `<img src="${data}" alt="캡쳐 화면" />`; // <a download="캡쳐"><img /></a>
  strip.insertBefore(link, strip.firstChild); // 최신순 정렬
}

// 필터 - 빨간색
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 200; // red
    pixels.data[i + 1] -= 50; // green
    pixels.data[i + 2] *= 0.5; // blue
  }
  return pixels;
}

// 필터 토글 함수 - 빨간색
function toggleRedEffect() {
  isRedEffect = !isRedEffect;
}

// 필터 - RGB 색상 분리
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // red
    pixels.data[i + 500] = pixels.data[i + 1]; // green
    pixels.data[i - 550] = pixels.data[i + 2]; // blue
  }
  return pixels;
}

// 필터 토글 함수 - RGB 색상 분리
function toggleRgbSplit() {
  isRgbSplit = !isRgbSplit;
}

// 필터 - 크로마키
function greenScreen(pixels) {
  const levels = {}; // 최대/최소 범위 저장

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0; // 알파 값 0으로 설정 => 투명화
    }
  }
  return pixels;
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
