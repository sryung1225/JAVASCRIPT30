"use strict";
// 마우스를 따라 textShadow 이동 시키기
// - 요소 크기 계산 : offsetWidth, offsetHeight
// - 요소 위치 계산 : offsetX, offsetY
// -----------------------------------------------------
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500; // 그림자가 이동할 최대 거리 : 500px
function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero; // hero의 크기
    let { offsetX: x, offsetY: y } = e; // 마우스 좌표
    const target = e.target;
    // 이벤트 대상이 hero가 아닌 경우(자식 요소(<h1 />)에서 발생한 경우)
    // 마우스 위치를 hero를 기준으로 한 좌표로 변환해줌
    // = hero와 h1 어디에서 발생하던지 hero를 기준으로 한 마우스 좌표 x, y
    if (this !== target) {
        x = x + target.offsetLeft;
        y = y + target.offsetTop;
    }
    // 그림자의 이동 거리 계산
    const xWalk = Math.round((x / width) * walk - walk / 2);
    const yWalk = Math.round((y / height) * walk - walk / 2);
    // - walk/2 하는 이유는 중앙에서 시작하기 위함
    // 그림자 그리기 (핑민초파)
    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
  `;
}
hero.addEventListener('mousemove', shadow);
