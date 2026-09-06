const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const search = require('../search.js');

test('Korean, initials, mixed syllables, spacing and multiple terms match answer text', () => {
  const matches = search.createMatcher('이동 초코보 교환권은 군표 200개로 교환해요. NPC와 함께');
  for (const query of ['초코보', 'ㅊㅋㅂ', '초ㅋㅂ', '초 코 보', '교환권은군표', '군표 200', 'npc', 'ㅇㄷ', '', ' !!! ']) {
    assert.equal(matches(query), true, query);
  }
  for (const query of ['ㅊㅋㅁ', '초코보 수리', '없는질문', '<script>']) assert.equal(matches(query), false, query);
  assert.equal(search.createMatcher('까마귀')( 'ㄲㅁㄱ'), true);
  assert.equal(search.createMatcher('풍맥')('ᄑᄆ'), true);
});

function setup() {
  function node() {
    return { hidden: false, disabled: false, value: '', textContent: '', handlers: {},
      addEventListener(name, callback) { this.handlers[name] = callback; },
      focus() { this.focused = true; }
    };
  }
  function item(text) {
    return { ...node(), open: false, spoilerOpen: false, cloneNode() {
      let spoiler = '알테마 웨폰 파괴작전', sources = '가이드전용';
      return {
        get textContent() { return text + spoiler + sources; },
        querySelectorAll(selector) {
          assert.equal(selector, '.spoiler, .official-sources');
          return [{ remove() { spoiler = ''; } }, { remove() { sources = ''; } }];
        }
      };
    } };
  }
  const sections = [
    { id: 'travel', title: '이동', items: [item('초코보 타는 방법. 군표 200개가 필요해요.'), item('초코 이야기')] },
    { id: 'equipment', title: '장비', items: [item('장비 수리는 NPC에게 맡기세요.')] }
  ].map(group => ({ ...group, hidden: false,
    querySelector: () => ({ textContent: group.title }),
    querySelectorAll: () => group.items
  }));
  const links = sections.map(() => { const count = node(); return { ...node(), querySelector: () => count, count }; });
  const nodes = Object.fromEntries(['faqSearchForm', 'faqSearch', 'clearSearch', 'searchStatus', 'emptyResults'].map(id => [id, node()]));
  nodes.faqSearchForm.hidden = true;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8'), {
    window: { FaqSearch: search },
    document: {
      getElementById: id => nodes[id],
      querySelectorAll: selector => { assert.equal(selector, '.faq-section'); return sections; },
      querySelector: selector => links[sections.findIndex(group => selector.includes('#' + group.id))]
    }
  });
  function input(value, composing = false) {
    nodes.faqSearch.value = value;
    nodes.faqSearch.handlers.input({ isComposing: composing });
  }
  return { nodes, sections, links, input };
}

test('composing final consonant filters immediately; topic counts and empty state follow results', () => {
  const { nodes, sections, links, input } = setup();
  assert.equal(nodes.faqSearchForm.hidden, false);
  assert.equal(nodes.clearSearch.disabled, true);
  assert.equal(nodes.searchStatus.textContent, '전체 3개 질문');
  input('ㅊㅋ', true);
  assert.match(nodes.searchStatus.textContent, /2개 질문/);
  input('ㅊㅋㅂ', true);
  assert.match(nodes.searchStatus.textContent, /1개 질문/);
  assert.equal(sections[0].items[0].hidden, false);
  assert.equal(sections[0].items[1].hidden, true);
  assert.equal(sections[1].hidden, true);
  assert.equal(links[1].hidden, true);
  assert.equal(links[0].count.textContent, '1');
  nodes.faqSearch.handlers.compositionend();
  assert.match(nodes.searchStatus.textContent, /1개 질문/);
  input('없는질문');
  assert.equal(nodes.emptyResults.hidden, false);
  assert.equal(sections.every(section => section.hidden), true);
  nodes.clearSearch.handlers.click();
  assert.equal(nodes.faqSearch.value, '');
  assert.equal(nodes.faqSearch.focused, true);
  assert.equal(nodes.emptyResults.hidden, true);
  assert.equal(sections.every(section => !section.hidden), true);
  assert.deepEqual(links.map(link => link.count.textContent), ['2', '1']);
});

test('answers and topics are searchable; spoilers and source labels are excluded; accordions keep their state', () => {
  const { nodes, sections, input } = setup();
  const chocobo = sections[0].items[0];
  chocobo.open = true;
  input('군표200');
  assert.equal(chocobo.hidden, false);
  assert.equal(chocobo.open, true);
  assert.equal(chocobo.spoilerOpen, false);
  input('장비');
  assert.equal(sections[1].hidden, false);
  for (const query of ['알테마', '가이드전용']) {
    input(query);
    assert.equal(nodes.emptyResults.hidden, false);
  }
  input('이동');
  assert.match(nodes.searchStatus.textContent, /2개 질문/);
  assert.equal(chocobo.open, true);
  let prevented = false;
  nodes.faqSearchForm.handlers.submit({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
});
