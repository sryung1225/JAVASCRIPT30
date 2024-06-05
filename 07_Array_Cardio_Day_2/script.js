"use strict";
const people = [];
const comments = [];
// 데이터를 json으로 분리하고 따로 데이터 가져오기 수행
fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
    people.push(...data.people);
    comments.push(...data.comments);
    // 각 배열 메서드를 활용해서 조건 만족하기
    hasAdult(people); // Array.prototype.some()
    isEveryoneAdult(people); // Array.prototype.every()
    findComment(comments, 823423); // Array.prototype.find()
    deleteComment(comments, 823423); // Array.prototype.finedIndex()
})
    .catch((error) => console.error(error, '못 찾았담'));
const currentYear = new Date().getFullYear(); // 현재 년도
// 1. people 중 한 명 이상이 19세 이상인지 판별
function hasAdult(people) {
    const answer = people.some((person) => {
        if (currentYear - person.year + 1 >= 19)
            return true;
        return false;
    });
    console.log(answer);
}
// 2. people 모두가 19세 이상인지 판별
function isEveryoneAdult(people) {
    const answer = people.every((person) => currentYear - person.year + 1 >= 19);
    console.log(answer);
}
// 3. ID에 해당되는 comment 찾기
function findComment(comments, id) {
    const comment = comments.find((comment) => comment.id === id);
    if (comment)
        console.log(comment.text);
}
// 4. ID에 해당되는 comment 제거하기
function deleteComment(comments, id) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    const newComments = [
        ...comments.slice(0, commentIndex),
        ...comments.slice(commentIndex + 1),
    ];
    console.log(newComments);
}
