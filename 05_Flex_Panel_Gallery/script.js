// 이벤트에 따른 토글 스타일 주기
// - 클릭 이벤트 시 즉시 toggleOpen 함수 실행
// - toggleOpen 실행을 통한 애니메이션 종료 감지 후 toggleActive 함수 실행
// -----------------------------------------------------

const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.toggle("open"); // 칸 너비 확대 + 두번째 글씨 크기 확대
}

function toggleActive(e) {
  // console.log(e.propertyName); // 이벤트 객체의 스타일 속성 확인
  if (e.propertyName.includes("flex")) {
    // flex를 갖고 있는 경우 동작
    this.classList.toggle("open-active"); // 위 아래 텍스트 나타나기
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  // panel이 transition이 완료됐음음 감지하면 toggleActive 실행
  panel.addEventListener("transitionend", toggleActive)
);
