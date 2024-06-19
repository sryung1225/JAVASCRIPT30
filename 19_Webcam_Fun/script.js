// 웹캠화면 구현하기
// -----------------------------------------------------

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const snap = document.querySelector('.snap'); // 촬영 시 들릴 효과음
