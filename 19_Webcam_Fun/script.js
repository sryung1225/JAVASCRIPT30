// 실시간 웹캠 화면 구현
// - 사용자의 웹캠에 접근 : navigator.mediaDevices
// - 실시간 웹캠 영상 화면 렌더링
// - 순간 화면 캡쳐 및 저장
// - 색상 필터 적용
// -----------------------------------------------------

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const snap = document.querySelector('.snap'); // 촬영 시 들릴 효과음
const strip = document.querySelector('.strip'); // 갤러리

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

    // 색상 필터 적용하기
    let pixels = ctx.getImageData(0, 0, width, height); // 캔버스 내 픽셀 데이터 가져오기
    pixels = redEffect(pixels); // 빨강 필터 적용
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

// 색상 필터 - 빨간색
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100; // red
    pixels.data[i + 1] -= 50; // green
    pixels.data[i + 2] *= 0.5; // blue
  }
  return pixels;
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
