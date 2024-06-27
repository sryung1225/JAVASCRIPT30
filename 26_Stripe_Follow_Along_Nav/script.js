// 마우스 hover와 드롭다운
// - 각 메뉴에 해당하는 <a />에 마우스가 올라가면 형제인 div.dropdown를 노출
// - 드롭다운의 배경을 별도의 요소로 지정 후 이동하는 듯한 애니메이션 연출
// - 특정 요소의 크기/위치를 가져오는 getBoundingClientRect()
// -----------------------------------------------------

const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  this.classList.add('trigger-enter');
  background.classList.add('open');

  // 드롭다운 배경의 위치/크기 지정 => 이동하는 듯한 애니메이션 연출
  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect(); // 드롭다운의 크기/위치
  const navCoords = nav.getBoundingClientRect(); // 네비게이션의 크기/위치

  const coords = {
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
    width: dropdownCoords.width,
    height: dropdownCoords.height,
  };

  background.style.setProperty(
    'transform',
    `translate(${coords.left}px, ${coords.top}px)`,
  );
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
}

function handleLeave() {
  this.classList.remove('trigger-enter');
  background.classList.remove('open');
}

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter),
);
triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave),
);
