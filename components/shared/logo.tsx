import { Blocks } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  href?: string
}

// 사이트 공통 로고 컴포넌트
export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold">
      <Blocks className="h-6 w-6" />
      <span>StarterKit</span>
    </Link>
  )
}
