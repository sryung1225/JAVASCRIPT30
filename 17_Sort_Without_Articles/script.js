// 특정 단어 제외하고 배열 정렬
// - json 데이터 fetch
// - 정규표현식을 활용하여 문자열 내 관사 제거
// - 문자열 알파벳 순 정렬
// -----------------------------------------------------

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    const bands = data.bands;
    console.log(bands);

    function strip(bandName) {
      // 관사 a, the, an 제거
      return bandName.replace(/^(a |the |an )/i, '').trim();
    }

    const sortedBands = [...bands].sort((a, b) =>
      // 알파벳 순 (a-z) 정렬
      strip(a) > strip(b) ? 1 : -1,
    );
    console.log(sortedBands);

    document.querySelector('#bands').innerHTML = sortedBands
      .map((band) => `<li>${band}</li>`)
      .join('');
  });
