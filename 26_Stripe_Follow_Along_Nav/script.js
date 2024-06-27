// 마우스 hover와 드롭다운
// - 각 메뉴에 해당하는 <a />에 마우스가 올라가면 형제인 div.dropdown를 노출
// -----------------------------------------------------

const triggers = document.querySelectorAll('.cool > li');

function handleEnter() {
  this.classList.add('trigger-enter');
}

function handleLeave() {
  this.classList.remove('trigger-enter');
}

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter),
);
triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave),
);
