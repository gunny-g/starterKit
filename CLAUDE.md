# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev       # 개발 서버 실행 (http://localhost:3000)
npm run build     # 프로덕션 빌드
npm run start     # 프로덕션 서버 실행
npm run lint      # ESLint 실행 (eslint 단독, next lint 아님)
```

ShadcnUI 컴포넌트 추가:
```bash
npx shadcn@latest add <컴포넌트명>
```

## 기술 스택

- **Next.js 16** (App Router, React Server Components 기본)
- **React 19** + **TypeScript 5** (strict 모드)
- **Tailwind CSS v4** — `tailwind.config.js` 없이 PostCSS 기반 (`@import "tailwindcss"`)
- **ShadcnUI** (new-york 스타일, lucide 아이콘, CSS 변수 기반 테마)
- **react-hook-form** + **Zod** (폼 유효성 검증)
- **next-themes** (다크모드), **sonner** (토스트)

## 아키텍처

### 라우트 그룹

- **`(landing)`** — 헤더 + 푸터 레이아웃 (공개 페이지)
  - `/`, `/getting-started`, `/examples/*`

### 컴포넌트 계층

```
components/ui/         ← ShadcnUI 자동 생성 (직접 수정 금지)
components/shared/     ← 재사용 컴포넌트 (logo, theme-toggle)
components/layout/     ← 레이아웃 컴포넌트 (headers, footer)
components/providers/  ← 프로바이더 래퍼 (ThemeProvider)
```

### 핵심 설정 파일

- **`lib/constants.ts`** — 사이트명, 네비게이션 메뉴 구조
- **`app/globals.css`** — OKLch 색상 변수, 다크모드 변수
- **`components.json`** — ShadcnUI 설정 (스타일, 경로 별칭)

### 다크모드

next-themes `attribute="class"` + globals.css `.dark` 클래스 조합.
Tailwind v4 커스텀 변형: `@custom-variant dark (&:is(.dark *))`.
루트 `<html>`에 `suppressHydrationWarning` 필수.

### 스타일링 유틸리티

`lib/utils.ts`의 `cn()` 함수: `clsx` + `tailwind-merge` 조합으로 조건부 클래스 적용 시 충돌 해결.

## 주의사항

- `components/ui/` 디렉토리는 ShadcnUI가 자동 생성 — `npx shadcn@latest add`로만 관리
- `app/(landing)/page.tsx`와 `app/page.tsx`가 동시에 존재하면 라우트 충돌 발생
- Tailwind CSS v4는 CSS 기반 설정 사용 (`tailwind.config.js` 불필요)
- 경로 별칭 `@/*`는 프로젝트 루트를 가리킴
- HTML lang은 `ko` (한국어)
