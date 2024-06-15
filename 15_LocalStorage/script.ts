// 투두 리스트 만들기
// - 리스트 아이템 배열 화면에 렌더링
// - form에서 input[type="submit"] 시, 신규 리스트 아이템 추가
// - 리스트 아이템 체크박스 토글 적용
// - 리스트 로컬 스토리지로 저장 및 불러오기
// -----------------------------------------------------

interface Item {
  text: string;
  done: boolean;
}

const addItems = document.querySelector('.add-items') as HTMLFormElement;
const itemsList = document.querySelector('.plates') as HTMLUListElement;
const items: Item[] = JSON.parse(localStorage.getItem('items') || '[]'); // 로컬스토리지의 items 값 가져오기

// 리스트에 신규 아이템 추가
function addItem(this: HTMLFormElement, e: Event) {
  // console.log(this); // ? <form />
  e.preventDefault();
  const input = this.querySelector('[name=item]') as HTMLInputElement;
  const text = input.value;
  const item: Item = { text, done: false };
  items.push(item); // 아이템 추가
  populateList(items, itemsList); // 리스트 갱신
  localStorage.setItem('items', JSON.stringify(items)); // 로컬스토리지의 items 값 갱신
  this.reset(); // form 초기화 (= input[name=item] value 비워줌)
}

// 할 일 상태 체크박스 토글
function toggleDone(e: MouseEvent) {
  const target = e.target as HTMLInputElement;
  if (!target.matches('input')) {
    return;
  }
  const el = target;
  const index = Number(el.dataset.index); // input의 data-index값 참조
  items[index].done = !items[index].done;
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}

// 리스트 화면 렌더링
function populateList(plates: Item[] = [], platesList: HTMLUListElement) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
    `;
    })
    .join('');
}

populateList(items, itemsList);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
