import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 서버 컴포넌트에서 데이터 패칭
interface Post {
  id: number
  title: string
  body: string
}

interface Todo {
  id: number
  title: string
  completed: boolean
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6", {
    next: { revalidate: 60 },
  })
  return res.json()
}

async function getTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8", {
    next: { revalidate: 60 },
  })
  return res.json()
}

export default async function DataFetchingPage() {
  const [posts, todos] = await Promise.all([getPosts(), getTodos()])

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
        데이터 패칭
      </h1>
      <p className="mt-2 text-muted-foreground">
        서버 컴포넌트에서 fetch API로 외부 데이터를 가져오는 예제입니다.
      </p>

      <div className="mt-12 space-y-12">
        {/* 게시글 목록 */}
        <section>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">게시글 목록</h2>
            <Badge variant="secondary">revalidate: 60s</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            JSONPlaceholder API에서 가져온 게시글 (서버 컴포넌트 + ISR)
          </p>
          <Separator className="my-4" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-base">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.body}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Badge variant="outline">#{post.id}</Badge>
                    <span className="flex items-center gap-1">
                      상세 보기 <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 할일 목록 */}
        <section>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">할일 목록</h2>
            <Badge variant="secondary">revalidate: 60s</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            병렬 데이터 패칭 (Promise.all)으로 두 API를 동시에 호출합니다.
          </p>
          <Separator className="my-4" />
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    todo.completed
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                  }`}
                >
                  {todo.completed ? "✓" : "·"}
                </div>
                <span
                  className={`flex-1 text-sm ${
                    todo.completed
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {todo.title}
                </span>
                <Badge
                  variant={todo.completed ? "default" : "outline"}
                  className="text-xs"
                >
                  {todo.completed ? "완료" : "진행중"}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* 코드 설명 */}
        <section>
          <h2 className="text-xl font-semibold">핵심 포인트</h2>
          <Separator className="my-4" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">서버 컴포넌트</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  async/await로 데이터를 직접 가져옵니다. 클라이언트에
                  JavaScript가 전송되지 않습니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ISR (revalidate)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  next: {"{ revalidate: 60 }"}으로 60초마다 데이터를 갱신합니다.
                  캐시와 최신 데이터의 균형을 잡습니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">병렬 패칭</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Promise.all로 여러 API를 동시에 호출하여 워터폴을
                  방지합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
