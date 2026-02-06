import { Logo } from "@/components/shared/logo"

// 랜딩 페이지 푸터
export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} StarterKit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
