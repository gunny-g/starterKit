import { LandingHeader } from "@/components/layout/landing-header"
import { LandingFooter } from "@/components/layout/landing-footer"

// 랜딩 페이지 레이아웃: 헤더 → 콘텐츠 → 푸터
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  )
}
