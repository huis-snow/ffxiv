(() => {
  'use strict';
  const form = document.getElementById('faqSearchForm');
  const input = document.getElementById('faqSearch');
  const clear = document.getElementById('clearSearch');
  const status = document.getElementById('searchStatus');
  const empty = document.getElementById('emptyResults');
  const groups = [...document.querySelectorAll('.faq-section')].map(section => {
    const topic = section.querySelector('h2').textContent;
    const link = document.querySelector(`.topic-nav a[href="#${section.id}"]`);
    const count = link.querySelector('span:last-child');
    const items = [...section.querySelectorAll('.faq-item')].map(element => {
      const copy = element.cloneNode(true);
      // Search only the answer text readers can choose to view without revealing quest names.
      copy.querySelectorAll('.spoiler, .official-sources').forEach(node => node.remove());
      return { element, matches: window.FaqSearch.createMatcher(topic + ' ' + copy.textContent) };
    });
    return { section, link, count, items };
  });
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  function render() {
    let matched = 0;
    for (const group of groups) {
      let groupCount = 0;
      for (const item of group.items) {
        const visible = item.matches(input.value);
        item.element.hidden = !visible;
        if (visible) groupCount++;
      }
      group.section.hidden = groupCount === 0;
      group.link.hidden = groupCount === 0;
      group.count.textContent = String(groupCount);
      matched += groupCount;
    }
    empty.hidden = matched !== 0;
    clear.disabled = input.value.length === 0;
    status.textContent = window.FaqSearch.normalize(input.value)
      ? `전체 ${total}개 중 ${matched}개 질문 · 질문을 펼쳐 답변을 확인하세요.`
      : `전체 ${total}개 질문`;
  }
  // Do not skip composing input: the final Korean consonant must participate immediately.
  input.addEventListener('input', render);
  input.addEventListener('compositionend', render);
  form.addEventListener('submit', event => { event.preventDefault(); render(); });
  clear.addEventListener('click', () => {
    input.value = '';
    render();
    input.focus();
  });
  render();
  form.hidden = false;
})();
