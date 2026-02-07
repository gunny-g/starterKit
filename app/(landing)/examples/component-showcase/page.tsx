import Link from "next/link"
import { ArrowLeft, Check, Bell, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function ComponentShowcasePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* 상단 네비게이션 */}
      <Link
        href="/examples"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        예제 목록으로
      </Link>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        컴포넌트 쇼케이스
      </h1>
      <p className="mt-2 text-muted-foreground">
        ShadcnUI 핵심 컴포넌트를 직접 확인해보세요.
      </p>

      <div className="mt-12 space-y-12">
        {/* 버튼 섹션 */}
        <section>
          <h2 className="text-xl font-semibold">Button</h2>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-3">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">아웃라인</Button>
            <Button variant="ghost">고스트</Button>
            <Button variant="destructive">삭제</Button>
            <Button variant="link">링크</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Badge 섹션 */}
        <section>
          <h2 className="text-xl font-semibold">Badge</h2>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-3">
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="outline">아웃라인</Badge>
            <Badge variant="destructive">경고</Badge>
          </div>
        </section>

        {/* Avatar 섹션 */}
        <section>
          <h2 className="text-xl font-semibold">Avatar</h2>
          <Separator className="my-4" />
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="사용자" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Card 섹션 */}
        <section>
          <h2 className="text-xl font-semibold">Card</h2>
          <Separator className="my-4" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "알림 설정",
                description: "푸시 알림과 이메일 알림을 관리합니다.",
                icon: Bell,
              },
              {
                title: "완료된 작업",
                description: "이번 주에 완료한 작업 목록입니다.",
                icon: Check,
              },
              {
                title: "즐겨찾기",
                description: "자주 사용하는 항목을 빠르게 접근합니다.",
                icon: Star,
              },
            ].map((card) => (
              <Card key={card.title}>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-2">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    자세히 보기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
