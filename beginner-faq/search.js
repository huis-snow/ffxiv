(function (root) {
  'use strict';
  const HEADS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const normalize = value => String(value).normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');
  const initial = char => {
    const code = char.charCodeAt(0) - 0xac00;
    return code >= 0 && code < 11172 ? normalize(HEADS[Math.floor(code / 588)]) : char;
  };
  function createMatcher(text) {
    const letters = [...normalize(text)];
    const heads = letters.map(initial);
    return query => String(query).trim().split(/\s+/).map(normalize).filter(Boolean).every(term => {
      const chars = [...term];
      for (let start = 0; start <= letters.length - chars.length; start++) {
        if (chars.every((char, offset) => char === letters[start + offset] || char === heads[start + offset])) return true;
      }
      return false;
    });
  }
  const api = { createMatcher, normalize };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FaqSearch = api;
})(typeof window === 'undefined' ? globalThis : window);
