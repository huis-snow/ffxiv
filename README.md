# 파판14 도구함

파이널판타지14 한국 서버를 위한 정적 웹 도구 모음입니다.

- 첫 화면: <https://huis-snow.github.io/ffxiv/>
- [메인퀘 어디쯤?](https://huis-snow.github.io/ffxiv/msq-tracker/) — 주요 퀘스트 이름·초성 검색과 전체·확장팩별 진행률
- [앱 설명과 데이터 갱신 안내](./msq-tracker/README.md)
- [시리즈 작전표](https://huis-snow.github.io/ffxiv/pvp-series-calculator/) — PvP 시리즈 목표 경험치·예상 판수·하루 목표 계산 ([앱 안내](./pvp-series-calculator/README.md))

## 배포

GitHub Pages의 원본은 `main` 브랜치의 `/ (root)`입니다. 빌드나 패키지 설치 없이 배포하며 `.nojekyll`을 사용합니다.

```text
/
├── index.html
├── theme.css
├── hub.css
├── favicon.svg
├── sitemap.xml
├── msq-tracker/
└── pvp-series-calculator/
```

검증: `node --test msq-tracker/tests/progress.test.cjs`

시리즈 작전표 검증: `node --test pvp-series-calculator/tests/pvp-series-calculator.test.js`

공통 색상·상단 메뉴·하단 영역은 `theme.css`, 도구 목록은 `hub.css`, 각 앱의 작업 화면은 해당 폴더의 `styles.css`에서 관리합니다.
