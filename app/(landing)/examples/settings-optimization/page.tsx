import Link from "next/link"
import { ArrowLeft, Image, FileCode, Globe, Shield, Gauge, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 설정 항목 데이터
const optimizationItems = [
  {
    icon: Image,
    title: "이미지 최적화",
    description: "Next.js Image 컴포넌트를 사용한 자동 최적화",
    badge: "내장",
    details: [
      "next/image 컴포넌트로 자동 WebP/AVIF 변환",
      "width, height 속성으로 CLS 방지",
      "priority 속성으로 LCP 이미지 우선 로딩",
      "placeholder='blur'로 점진적 로딩",
    ],
  },
  {
    icon: FileCode,
    title: "메타데이터 관리",
    description: "SEO와 소셜 공유를 위한 메타데이터 설정",
    badge: "App Router",
    details: [
      "layout.tsx에서 metadata export로 기본 메타데이터 설정",
      "generateMetadata()로 동적 메타데이터 생성",
      "Open Graph, Twitter Card 자동 생성",
      "robots.txt, sitemap.xml 자동 생성",
    ],
  },
  {
    icon: Globe,
    title: "환경변수 관리",
    description: "개발/프로덕션 환경별 변수 관리 전략",
    badge: "보안",
    details: [
      ".env.local → 개발 환경 (Git 미포함)",
      ".env.production → 프로덕션 환경",
      "NEXT_PUBLIC_ 접두사 → 클라이언트 노출 변수",
      "접두사 없음 → 서버 전용 변수 (비밀키 등)",
    ],
  },
  {
    icon: Shield,
    title: "보안 헤더",
    description: "next.config.ts에서 보안 헤더 설정",
    badge: "보안",
    details: [
      "Content-Security-Policy (CSP) 설정",
      "X-Frame-Options: DENY",
      "X-Content-Type-Options: nosniff",
      "Strict-Transport-Security (HSTS)",
    ],
  },
  {
    icon: Gauge,
    title: "번들 최적화",
    description: "클라이언트 번들 크기를 줄이는 전략",
    badge: "성능",
    details: [
      "서버 컴포넌트 기본 → 'use client' 최소화",
      "동적 import (next/dynamic)으로 코드 스플리팅",
      "Tree Shaking: 아이콘 개별 import",
      "@next/bundle-analyzer로 번들 분석",
    ],
  },
  {
    icon: Package,
    title: "캐싱 전략",
    description: "데이터 캐싱과 재검증 설정",
    badge: "성능",
    details: [
      "fetch cache: 'force-cache' (기본값)",
      "revalidate: N초 → ISR (증분 정적 재생성)",
      "cache: 'no-store' → SSR (항상 최신 데이터)",
      "revalidatePath/revalidateTag → 수동 캐시 무효화",
    ],
  },
]

export default function SettingsOptimizationPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/examples"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        예제 목록으로
      </Link>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        설정 및 최적화
      </h1>
      <p className="mt-2 text-muted-foreground">
        프로덕션 환경에서 필요한 설정과 최적화 전략을 정리했습니다.
      </p>

      <div className="mt-12 space-y-6">
        {optimizationItems.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {item.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
