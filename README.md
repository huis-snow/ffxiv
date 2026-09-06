# 파판14 도구함

파이널판타지14 한국 서버를 위한 정적 웹 도구 모음입니다.

- 첫 화면: <https://huis-snow.github.io/ffxiv/>
- [메인퀘 어디쯤?](https://huis-snow.github.io/ffxiv/msq-tracker/) — 주요 퀘스트 이름·초성 검색과 전체·확장팩별 진행률
- [앱 설명과 데이터 갱신 안내](./msq-tracker/README.md)
- [시리즈 작전표](https://huis-snow.github.io/ffxiv/pvp-series-calculator/) — PvP 시리즈 목표 경험치·예상 판수·하루 목표 계산 ([앱 안내](./pvp-series-calculator/README.md))
- [임무 초성 사전](https://huis-snow.github.io/ffxiv/duty-finder/) — 던전·토벌전·레이드 등 공식 임무의 한글·초성 검색 ([앱 안내](./duty-finder/README.md))

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
├── pvp-series-calculator/
└── duty-finder/
```

검증: `node --test msq-tracker/tests/progress.test.cjs`

시리즈 작전표 검증: `node --test pvp-series-calculator/tests/pvp-series-calculator.test.js`

임무 초성 사전 검증: `node --test duty-finder/tests/duty-finder.test.cjs`

공통 색상·상단 메뉴·하단 영역은 `theme.css`, 도구 목록은 `hub.css`, 각 앱의 작업 화면은 해당 폴더의 `styles.css`에서 관리합니다.

모든 페이지의 본문·숫자·영문·라벨은 네이버 **나눔스퀘어라운드**를 공통으로 사용합니다. [네이버 공식 배포 페이지](https://hangeul.naver.com/font/nanum)의 Regular·Bold·ExtraBold 웹폰트를 `fonts/nanum-square-round/`에 포함해 직접 제공합니다. 원본 파일은 변경하지 않았으며, [저작권 안내와 SIL Open Font License 1.1](./fonts/nanum-square-round/OFL.txt)을 함께 배포합니다. [네이버 라이선스 안내](https://help.naver.com/support/contents/contents.help?serviceNo=1074&categoryNo=3497).
