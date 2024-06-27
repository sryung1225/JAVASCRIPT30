// 마우스 hover와 드롭다운
// - 각 메뉴에 해당하는 <a />에 마우스가 올라가면 형제인 div.dropdown를 노출
// - 다수의 클래스 명과 setTimeout을 활용하여 순차 노출 애니메이션 연출
// - 드롭다운의 배경을 별도의 요소로 지정 후 이동하는 듯한 애니메이션 연출
// - 특정 요소의 크기/위치를 가져오는 getBoundingClientRect()
// -----------------------------------------------------

{
  const triggers = document.querySelectorAll(
    '.cool > li',
  ) as NodeListOf<HTMLUListElement>;
  const background = document.querySelector(
    '.dropdownBackground',
  ) as HTMLDivElement;
  const nav = document.querySelector('.top') as HTMLDivElement;

  // 마우스가 들어올 때 : 노출 관련 클래스 추가 및 스타일 직접 지정
  function handleEnter(this: HTMLUListElement) {
    this.classList.add('trigger-enter');
    setTimeout(
      () =>
        this.classList.contains('trigger-enter') &&
        this.classList.add('trigger-enter-active'),
      150,
    );
    background.classList.add('open');

    // 드롭다운 배경의 위치/크기 지정 => 이동하는 듯한 애니메이션 연출
    const dropdown = this.querySelector('.dropdown') as HTMLDivElement;
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

  // 마우스가 떠날 때 : 노출 관련 스타일 클래스 제거
  function handleLeave(this: HTMLUListElement) {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
  }

  triggers.forEach((trigger) =>
    trigger.addEventListener('mouseenter', handleEnter),
  );
  triggers.forEach((trigger) =>
    trigger.addEventListener('mouseleave', handleLeave),
  );
}
