// 실시간 웹캠 화면 구현
// - 사용자의 웹캠에 접근 : navigator.mediaDevices
// -
// -----------------------------------------------------

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const snap = document.querySelector('.snap'); // 촬영 시 들릴 효과음

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

getVideo();
