import Link from "next/link"
import { ArrowRight, Zap, Shield, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 기능 카드 데이터
const features = [
  {
    icon: Zap,
    title: "빠른 성능",
    description:
      "Next.js 16의 최신 기능과 React 19 서버 컴포넌트로 최적화된 성능을 제공합니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description:
      "TypeScript 엄격 모드와 Zod 스키마 검증으로 런타임 에러를 사전에 방지합니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description:
      "Tailwind CSS v4와 ShadcnUI로 모든 디바이스에서 완벽하게 동작합니다.",
  },
]

export default function LandingPage() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="container mx-auto px-4 py-24 text-center md:py-32">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          모던 웹 개발을 위한{" "}
          <span className="text-primary">스타터킷</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Next.js 16, ShadcnUI, Tailwind CSS v4를 기반으로 빠르게 프로젝트를
          시작하세요.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              대시보드 체험
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#features">기능 살펴보기</Link>
          </Button>
        </div>
      </section>

      {/* Features 섹션 */}
      <section id="features" className="border-t bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">주요 기능</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            프로덕션 레벨의 웹 애플리케이션 개발에 필요한 핵심 기능을 모두
            갖추고 있습니다.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section id="cta" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            클론하고, 커스터마이징하고, 배포하세요. 필요한 모든 것이 준비되어
            있습니다.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/dashboard">
              시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
