// 투두 리스트 만들기
// - 리스트 아이템 배열 화면에 렌더링
// -----------------------------------------------------

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = ['숨쉬기'];

// 리스트 화면 렌더링
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        ${plate}
      </li>
    `;
    })
    .join('');
}

populateList(items, itemsList);
