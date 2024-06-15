// 투두 리스트 만들기
// - 리스트 아이템 배열 화면에 렌더링
// - form에서 input[type="submit"] 시, 신규 리스트 아이템 추가
// - 리스트 로컬 스토리지로 저장 및 불러오기
// -----------------------------------------------------

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // 로컬스토리지의 items 값 가져오기

// 리스트에 신규 아이템 추가
function addItem(e) {
  // console.log(this); // ? <form />
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  items.push(text); // 아이템 추가
  populateList(items, itemsList); // 리스트 갱신
  localStorage.setItem('items', JSON.stringify(items)); // 로컬스토리지의 items 값 갱신
  this.reset(); // form 초기화 (= input[name=item] value 비워줌)
}

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
addItems.addEventListener('submit', addItem);
