"use strict";
// 가로 스크롤 슬라이더
// 슬라이더 : ul.items / 아이템 : li.item
// 마우스 클릭 후 이동하는 만큼 슬라이더 동작
// -----------------------------------------------------
{
    const slider = document.querySelector('.items');
    let isDown = false; // 현재 스크롤이 진행 중인가 여부
    let startX; // 슬라이더에서의 x 좌표
    let scrollLeft; // 슬라이더의 현재 스크롤 위치
    // 마우스 클릭 : 슬라이더 활성화
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft; // 슬라이더 내 클릭 위치 : 마우스 x 좌표 - 슬라이더의 x 좌표
        scrollLeft = slider.scrollLeft; // 슬라이더의 초기 스크롤 위치
    });
    // 마우스 떼기 : 슬라이더 비활성화
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    // 슬라이더 떠나기 : 슬라이더 비활성화
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    // 슬라이더 활성화 중 마우스 이동 : 슬라이더 이동
    slider.addEventListener('mousemove', (e) => {
        if (!isDown)
            return;
        e.preventDefault(); // 텍스트 선택 등의 기본 동작 방어
        const x = e.pageX - slider.offsetLeft; // 슬라이더 내 클릭 위치
        const walk = (x - startX) * 3; // 스크롤 정도(속도)
        slider.scrollLeft = scrollLeft - walk; // 슬라이더 스크롤 위치 업데이트 : 초기 스크롤 위치 - 스크롤 정도
    });
}
