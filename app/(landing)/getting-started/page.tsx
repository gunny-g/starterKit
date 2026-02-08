import Link from "next/link"
import {
  Terminal,
  FolderTree,
  Paintbrush,
  Palette,
  Plus,
  Blocks,
  Github,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 기술 스택 배지 목록
const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "ShadcnUI",
]

// 수정 우선순위 파일 목록
const priorityFiles = [
  {
    path: "lib/constants.ts",
    purpose: "사이트 이름, 네비게이션 구성",
    priority: "필수",
  },
  {
    path: "app/globals.css",
    purpose: "색상 테마 (OKLch 변수)",
    priority: "필수",
  },
  {
    path: "components/shared/logo.tsx",
    purpose: "로고 아이콘 및 텍스트",
    priority: "필수",
  },
  {
    path: "app/(landing)/page.tsx",
    purpose: "랜딩 페이지 콘텐츠",
    priority: "권장",
  },
]

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* 섹션 1: 페이지 헤더 + 기술 스택 */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          시작하기
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          이 스타터킷을 프로젝트에 맞게 설정하는 과정을 단계별로 안내합니다.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* 섹션 2: 3단계 시작 흐름 */}
      <section>
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          3단계로 시작하기
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          설치부터 커스터마이징까지, 순서대로 따라하면 됩니다.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* 카드 1: 프로젝트 설치 */}
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">1. 프로젝트 설치</CardTitle>
              <CardDescription>
                저장소를 클론하고 의존성을 설치합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <code className="block rounded-md bg-muted px-3 py-2 text-sm">
                  git clone &lt;repo-url&gt;
                </code>
                <code className="block rounded-md bg-muted px-3 py-2 text-sm">
                  npm install
                </code>
                <code className="block rounded-md bg-muted px-3 py-2 text-sm">
                  npm run dev
                </code>
              </div>
            </CardContent>
          </Card>

          {/* 카드 2: 구조 파악 */}
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FolderTree className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">2. 구조 파악</CardTitle>
              <CardDescription>
                핵심 디렉토리 구조를 이해합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted px-3 py-2 text-sm leading-relaxed">
{`app/
├── (landing)/   # 랜딩 페이지
└── globals.css  # 테마 변수

components/
├── ui/          # ShadcnUI
├── shared/      # 공유 컴포넌트
└── layout/      # 레이아웃

lib/
└── constants.ts # 사이트 설정`}
              </pre>
            </CardContent>
          </Card>

          {/* 카드 3: 커스터마이징 */}
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Paintbrush className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">3. 커스터마이징</CardTitle>
              <CardDescription>
                프로젝트에 맞게 수정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <code className="text-xs">constants.ts</code>에서 사이트 이름·메뉴 변경
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <code className="text-xs">globals.css</code>에서 색상 테마 조정
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <code className="text-xs">logo.tsx</code>에서 로고 교체
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* 섹션 3: 가장 먼저 수정할 파일 */}
      <section>
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          가장 먼저 수정할 파일
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          아래 파일들을 위에서부터 순서대로 수정하면 프로젝트를 빠르게 자신의
          것으로 만들 수 있습니다.
        </p>

        <div className="mx-auto mt-8 max-w-3xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>파일 경로</TableHead>
                <TableHead>용도</TableHead>
                <TableHead className="text-center">우선순위</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priorityFiles.map((file) => (
                <TableRow key={file.path}>
                  <TableCell className="font-mono text-sm">
                    {file.path}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {file.purpose}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        file.priority === "필수" ? "default" : "secondary"
                      }
                    >
                      {file.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* 섹션 5: 디자인/테마 커스터마이징 */}
      <section>
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          디자인 · 테마 커스터마이징
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          색상 변경과 컴포넌트 추가 방법을 안내합니다.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* 색상 테마 변경 */}
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">색상 테마 변경</CardTitle>
              <CardDescription>
                <code className="text-xs">globals.css</code>의 OKLch 색상
                변수를 수정하여 전체 테마를 변경할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="rounded-md bg-muted px-3 py-2 text-xs leading-relaxed">
{`:root {
  --background: 1 0 0;       /* 배경색 */
  --foreground: 0.145 0 0;   /* 텍스트색 */
  --primary: 0.205 0.155 246.912;
  /* ... */
}`}
              </pre>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://ui.shadcn.com/themes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShadcnUI Themes에서 색상 선택
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* 컴포넌트 추가 */}
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">컴포넌트 추가</CardTitle>
              <CardDescription>
                ShadcnUI CLI로 필요한 컴포넌트를 추가할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <code className="block rounded-md bg-muted px-3 py-2 text-sm">
                npx shadcn@latest add [이름]
              </code>
              <p className="text-sm text-muted-foreground">
                예:{" "}
                <code className="text-xs">dialog</code>,{" "}
                <code className="text-xs">tabs</code>,{" "}
                <code className="text-xs">accordion</code>,{" "}
                <code className="text-xs">alert</code> 등
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://ui.shadcn.com/docs/components"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShadcnUI 컴포넌트 목록
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* 섹션 6: 다음 행동 CTA */}
      <section>
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          다음 단계
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          준비가 되었다면, 아래에서 원하는 곳으로 이동하세요.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="transition-colors hover:border-primary/50">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Blocks className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">컴포넌트 쇼케이스</CardTitle>
              <CardDescription>
                ShadcnUI 컴포넌트와 다양한 UI 패턴을 체험합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/examples/component-showcase">
                  쇼케이스 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-colors hover:border-primary/50">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Blocks className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">예제 살펴보기</CardTitle>
              <CardDescription>
                컴포넌트 조합 예제와 UI 패턴을 참고합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/examples">
                  예제 페이지로 이동
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-colors hover:border-primary/50">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-3">소스 코드 확인</CardTitle>
              <CardDescription>
                GitHub에서 전체 소스 코드를 확인하고 이슈를 남깁니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub 저장소
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
