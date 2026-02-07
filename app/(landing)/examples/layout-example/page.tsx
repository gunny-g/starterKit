import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LayoutExamplePage() {
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
        레이아웃 예제
      </h1>
      <p className="mt-2 text-muted-foreground">
        Tailwind CSS를 활용한 다양한 레이아웃 패턴을 확인하세요.
      </p>

      <div className="mt-12 space-y-12">
        {/* 그리드 레이아웃 */}
        <section>
          <h2 className="text-xl font-semibold">반응형 그리드</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            sm:grid-cols-2 → lg:grid-cols-4 반응형 그리드
          </p>
          <Separator className="my-4" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="flex h-24 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium"
              >
                항목 {i + 1}
              </div>
            ))}
          </div>
        </section>

        {/* 사이드바 레이아웃 */}
        <section>
          <h2 className="text-xl font-semibold">사이드바 + 콘텐츠</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            모바일에서는 세로, 데스크탑에서는 사이드바 + 콘텐츠 구조
          </p>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4 md:flex-row">
            <aside className="rounded-lg border bg-muted/50 p-4 md:w-64 md:shrink-0">
              <h3 className="font-medium">사이드바</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="rounded-md bg-primary/10 px-3 py-1.5 text-foreground">
                  메뉴 1
                </li>
                <li className="px-3 py-1.5">메뉴 2</li>
                <li className="px-3 py-1.5">메뉴 3</li>
                <li className="px-3 py-1.5">메뉴 4</li>
              </ul>
            </aside>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>메인 콘텐츠</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  이 영역은 나머지 공간을 모두 차지합니다. flex-1 속성으로
                  사이드바를 제외한 나머지 너비를 자동으로 채웁니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Holy Grail 레이아웃 */}
        <section>
          <h2 className="text-xl font-semibold">Holy Grail 레이아웃</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            헤더 + 좌/우 사이드바 + 콘텐츠 + 푸터
          </p>
          <Separator className="my-4" />
          <div className="overflow-hidden rounded-lg border">
            <div className="bg-primary/10 p-3 text-center text-sm font-medium">
              헤더
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="border-b bg-muted/50 p-3 text-center text-sm md:w-40 md:border-b-0 md:border-r">
                좌측 사이드바
              </div>
              <div className="flex-1 p-6 text-center text-sm">
                <p className="text-muted-foreground">메인 콘텐츠 영역</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  flex-1로 가용 공간 전체 사용
                </p>
              </div>
              <div className="border-t bg-muted/50 p-3 text-center text-sm md:w-40 md:border-l md:border-t-0">
                우측 사이드바
              </div>
            </div>
            <div className="bg-primary/10 p-3 text-center text-sm font-medium">
              푸터
            </div>
          </div>
        </section>

        {/* 카드 Masonry */}
        <section>
          <h2 className="text-xl font-semibold">높이가 다른 카드 그리드</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            CSS columns를 활용한 Masonry 스타일 레이아웃
          </p>
          <Separator className="my-4" />
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {[
              "짧은 카드 내용입니다.",
              "이 카드는 조금 더 긴 내용을 담고 있습니다. 여러 줄에 걸쳐 표시됩니다.",
              "중간 길이의 카드입니다.",
              "아주 긴 카드입니다. CSS columns 속성을 사용하면 Pinterest 스타일의 Masonry 레이아웃을 쉽게 구현할 수 있습니다. JavaScript 없이도 가능합니다.",
              "또 다른 짧은 카드.",
              "중간 길이의 카드 내용입니다. 다양한 높이를 가진 카드들이 자연스럽게 배치됩니다.",
            ].map((text, i) => (
              <Card key={i} className="mb-4 break-inside-avoid">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
