import Link from "next/link"
import { ArrowRight, Blocks, FileInput, Layout, MousePointerClick, Globe, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 예제 카테고리 데이터
const exampleCategories = [
  {
    icon: Blocks,
    title: "컴포넌트 쇼케이스",
    description:
      "Button, Card, Badge, Avatar 등 ShadcnUI 핵심 컴포넌트를 한눈에 확인하세요.",
    href: "/examples/component-showcase",
  },
  {
    icon: FileInput,
    title: "폼 예제",
    description:
      "react-hook-form + Zod 스키마 검증을 활용한 다양한 폼 패턴을 살펴보세요.",
    href: "/examples/form",
  },
  {
    icon: Layout,
    title: "레이아웃 예제",
    description:
      "그리드, 플렉스, 반응형 레이아웃 패턴을 Tailwind CSS로 구현합니다.",
    href: "/examples/layout-example",
  },
  {
    icon: MousePointerClick,
    title: "usehooks-ts 예제",
    description:
      "useLocalStorage, useMediaQuery 등 실용적인 커스텀 훅 사용법을 배워보세요.",
    href: "/examples/usehooks-ts",
  },
  {
    icon: Globe,
    title: "데이터 패칭",
    description:
      "서버 컴포넌트, fetch API, 로딩/에러 처리 등 데이터 패칭 패턴을 소개합니다.",
    href: "/examples/data-fetching",
  },
  {
    icon: Settings,
    title: "설정 및 최적화",
    description:
      "이미지 최적화, 메타데이터, 환경변수 관리 등 프로덕션 설정을 다룹니다.",
    href: "/examples/settings-optimization",
  },
]

export default function ExamplesPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {/* 페이지 헤더 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          예제 모음
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          스타터킷에 포함된 다양한 예제를 통해 핵심 패턴과 사용법을
          확인해보세요.
        </p>
      </div>

      {/* 카드 그리드 */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exampleCategories.map((category) => (
          <Card
            key={category.title}
            className="flex flex-col transition-shadow hover:shadow-lg"
          >
            <CardHeader className="flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={category.href}>
                  예제 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 하단 안내 */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          각 예제는 독립적으로 동작하며, 소스 코드를 자유롭게 참고할 수
          있습니다.
        </p>
      </div>
    </section>
  )
}
