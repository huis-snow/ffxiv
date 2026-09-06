# 파판14 도구함

파이널판타지14 한국 서버를 위한 정적 웹 도구 모음입니다.

- 첫 화면: <https://huis-snow.github.io/ffxiv/>
- [메인퀘 어디쯤?](https://huis-snow.github.io/ffxiv/msq-tracker/) — 주요 퀘스트 이름·초성 검색과 전체·확장팩별 진행률
- [앱 설명과 데이터 갱신 안내](./msq-tracker/README.md)

## 배포

GitHub Pages의 원본은 `main` 브랜치의 `/ (root)`입니다. 빌드나 패키지 설치 없이 배포하며 `.nojekyll`을 사용합니다.

```text
/
├── index.html
├── favicon.svg
├── sitemap.xml
└── msq-tracker/
```

검증: `node --test msq-tracker/tests/progress.test.cjs`
