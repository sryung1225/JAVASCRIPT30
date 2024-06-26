// 천장에 붙는 네비게이션
// - 브라우저 최상단에 붙었을 때 스타일 토글 적용
// -----------------------------------------------------
const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    // nav가 천장에 닿은 경우
    document.body.classList.add('fixed-nav'); // poistion: fixed를 포함한 스타일 활성화
    document.body.style.paddingTop = nav.offsetHeight + 'px'; // nav 크기만큼 여백 확보
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', fixNav);
