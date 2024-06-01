"use strict";
// 지정된 css variables 변화시키기
// - input value의 변화마다 variable 값을 새로 덮어 씌움
// - 모든 input들을 한 번에 통제
// -----------------------------------------------------
const inputs = document.querySelectorAll(".controls input");
function handleUpdate() {
    const suffix = this.dataset.sizing || ""; // 단위를 위해 지정. base color는 공백값 그 외에는 px
    // console.log(document.documentElement.style); // :root 값을 덮어 쓰기 위해 <html />의 style 사용
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix); // ex) <html style="--blur: 25px" />
}
inputs.forEach((input) => {
    input.addEventListener("change", handleUpdate); // 마우스 움직임이 끝났을 때에만 포착
    // input.addEventListener("mousemove", handleUpdate); // 마우스 움직임 중에 포착
});
