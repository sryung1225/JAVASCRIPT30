// 키보드를 이용해서 다중 선택하기
// - 어떤 항목을 체크하고, shift 키와 함께 다른 항목을 체크했을 때 사이 영역 모두 체크되도록 하기
// - 체크된 항목의 순서를 받지 않고 토글을 활용
// -----------------------------------------------------

const checkboxes = document.querySelectorAll('input[type="checkbox');
// console.log(checkboxes); // ? NodeList(9) [input, input, input, input, input, input, input, input, input]
let lastChecked; // 최근 클릭한 input 저장

function handleCheck(e) {
  // console.log(e);
  let inBetween = false;

  // shift 키를 누르고 있으며, 지금 항목을 체크한 경우
  if (e.shiftKey && this.checked) {
    // 모든 체크박스를 순환
    checkboxes.forEach((checkbox) => {
      // 지금 체크한 항목(this)과 이전에 마지막으로 체크한 항목(lastChecked) 사이에 해당되는 체크박스 검출
      if (checkbox === this || checkbox === lastChecked) {
        // this와 lastChecked 중 하나를 만났을 때 true, 남은 하나를 만났을 때 false => 가운데에만 true 상태
        inBetween = !inBetween;
      }
      if (inBetween) checkbox.checked = true; // 체크박스 활성화
    });
  }
  lastChecked = this;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', handleCheck);
});
