"use strict";
// 마우스를 따라 텍스트 강조하기
// - 하이라이팅을 위한 별도의 요소 생성 (position: absolute)
// - getBoundingClientRect()를 이용한 요소의 위치 정보 확인
// - 얻은 위치 정보를 활용한 스타일링
// -----------------------------------------------------
// 마우스를 따라 강조 됨을 표시할 새로운 요소 추가 : 하이라이트
// <span class="highlight"></span>
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);
// 마우스가 지나가면 하이라이트 활성화
function highlightLink(e) {
    // 마우스가 머무른 자리(this) 좌표 구하기
    const linkCoords = this.getBoundingClientRect();
    console.log(linkCoords); // ? DOMRect {x: 746.96875, y: 100, width: 135.984375, height: 31, top: 100, …}
    // 크기, 위치 지정
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX,
    };
    // span.highlight의 스타일 수정
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
// 강조가 될 수 있는 요소들 (a)
const triggers = document.querySelectorAll('a');
triggers.forEach((a) => {
    a.addEventListener('mouseenter', highlightLink);
});
