"use strict";
// 두더지 잡기 게임
// - 한 판당 10초간 진행
// - 각 구멍에는 한 마리의 두더지가 배치
// - 두더지는 한 마리씩, 매번 다른 구멍(randomHole), 매번 다른 시간동안(randomTime) 등장(peep)
// - 두더지가 등장했을 때 클릭하면 점수 획득
// -----------------------------------------------------
const holes = document.querySelectorAll('.hole'); // 구멍
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole'); // 두더지
let lastHole; // 가장 최근 두더지가 나왔던 구멍 : 연속 등장 방어
let timeUp = false; // 게임 중 여부
let score = 0; // 점수
// min~max 내 랜덤 시간 생성 후 반환
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// 두더지가 등장할 구멍 랜덤 지정
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    // 한 구멍에서 연속으로 두더지가 등장하지 않도록 제어
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
// 랜덤 두더지 등장
function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up'); // 지정된 구멍에 스타일 추가 : 두더지 등장
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp)
            peep(); // 잔여 시간이 남아있으면 랜덤 두더지 재등장
    }, time); // 일정 시간 이후 두더지 숨기기
}
// 게임 시작
function startGame() {
    // 설정 초기화
    scoreBoard.textContent = `0`;
    timeUp = false;
    score = 0;
    // 두더지 첫 등장
    peep();
    setTimeout(() => (timeUp = true), 10000); // 게임은 10초간 진행
}
// 두더지 잡기
function bonk(e) {
    if (!e.isTrusted)
        return;
    const parent = this.parentNode;
    if (!parent)
        return;
    score++; // 점수 획득
    parent.classList.remove('up'); // 두더지 숨기기
    scoreBoard.textContent = `${score}`;
}
moles.forEach((mole) => mole.addEventListener('click', bonk));
