"use strict";
// 데이터를 json으로 분리하고 따로 데이터 가져오기 수행
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
    const inventors = data.inventors;
    const people = data.people;
    const rides = data.rides;
    // array 메서드 실행
    born1500s(inventors); // Array.prototype.filter()
    callName(inventors); // Array.prototype.map()
    sortFirstBirth(inventors); // Array.prototype.sort()
    getYears(inventors); // Array.prototype.reduce()
    sortLongLives(inventors);
    findBoulevards();
    sortLastName(people);
    countRides(rides);
})
    .catch((error) => console.error("못 가져 왔담"));
// 1. 1500년대에 태어난 inventors만 나열하기
function born1500s(inventors) {
    const answer = inventors.filter((inventor) => inventor.year >= 1500 && inventor.year < 1600);
    console.log(answer);
}
// 2. inventors 이름 나열하기
function callName(inventors) {
    const answer = inventors.map((inventor) => `${inventor.first} ${inventor.last}`);
    console.log(answer);
}
// 3. inventors 먼저 태어난 순 정렬하기
function sortFirstBirth(inventors) {
    const answer = [...inventors].sort((a, b) => a.year - b.year);
    console.log(answer);
}
// 4. 모든 inventors가 살았던 햇수 더하기
function getYears(inventors) {
    const answer = inventors.reduce((acc, cur) => acc + (cur.passed - cur.year), 0);
    console.log(answer);
}
// 5. inventors 오래 산 순 정렬하기
function sortLongLives(inventors) {
    const answer = [...inventors].sort((a, b) => b.passed - b.year - (a.passed - a.year));
    console.log(answer);
}
// 6. 이름에 de가 들어가는 Boulevards의 배열 만들기
function findBoulevards() {
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    // 위 링크 속 태그 html에 임의로 추가
    const category = document.querySelector(".mw-category");
    const links = Array.from(category.querySelectorAll("a"));
    const boulevards = links.map((link) => link.textContent); // <a /> 내 텍스트 가져오기
    const de = boulevards.filter((boulevard) => boulevard.includes("de"));
    console.log(de);
}
// 7. people 성 순으로 나열하기
function sortLastName(people) {
    const answer = [...people].sort((a, b) => {
        const aLastName = a.split(", ")[0];
        const bLastName = b.split(", ")[0];
        return aLastName > bLastName ? 1 : -1;
    });
    console.log(answer);
}
// 8. rides 종류 별 갯수 구하기
function countRides(rides) {
    const answer = rides.reduce((acc, cur) => {
        if (!acc[cur])
            acc[cur] = 1;
        else
            acc[cur]++;
        return acc;
    }, {});
    console.log(answer);
}
