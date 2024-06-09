// 스크롤에 따른 이미지 렌더링
// - 이벤트가 중복되어 여러번 발생하는 것을 막기 위한 debounce 적용
// -----------------------------------------------------

function debounce(func, wait = 20, immediate = true) {
  // func: 디바운스할 함수
  // wait: 디바운스할 간격 (ms)
  // immediate: true인 경우 함수가 호출되자마자 즉시 실행한 뒤 디바운스 동작

  let timeout; // wait까지의 시간을 추적하기 위한 타이머 변수

  // wait 후에 실행될 함수 later()
  function later() {
    timeout = null; // 타이머를 초기화해서 함수가 다시 호출할 수 있도록 설정
    if (!immediate) {
      func.apply(context, args); // immediate가 false인 경우, wait 후에 later 함수 실행
    }
  }

  return function () {
    const context = this; // 현재 실행 컨텍스트
    const args = arguments; // 호출된 함수의 인수
    const callNow = immediate && !timeout; // 즉시 호출 여부 (타이머가 없고 immediate가 true일 때)

    clearTimeout(timeout); // 기존 타이머 제거
    timeout = setTimeout(later, wait); // wait 만큼 지난 후 later 함수 실행
    if (callNow) {
      func.apply(context, args); // immediate가 true이고 타이머가 없을 때 함수 즉시 실행
    }
  };

  // 함수가 호출되면, immediate가 true일 경우 즉시 실행하고, false일 경우 wait 후 실행
  // 연속 호출 시 타이머를 리셋하여 마지막 호출로부터 wait 시간이 지난 후에만 실행
  // 불필요한 함수 호출을 줄여 성능을 최적화함
}
