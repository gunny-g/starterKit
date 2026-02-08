// 사이트 기본 정보
export const siteConfig = {
  name: "StarterKit",
  description: "Next.js 16 + ShadcnUI + Tailwind CSS v4 모던 웹 스타터킷",
} as const

// 랜딩 페이지 네비게이션 항목
export const landingNavItems = [
  { label: "기능", href: "#features" },
  { label: "예제", href: "/examples" },
  { label: "시작하기", href: "/getting-started" },
] as const
