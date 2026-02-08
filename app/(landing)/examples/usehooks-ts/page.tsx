"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// useLocalStorage 훅
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue] as const
}

// useMediaQuery 훅
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

// useDebounce 훅
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// useToggle 훅
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue((v) => !v)
  return [value, toggle] as const
}

// useWindowSize 훅
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("demo-name", "")

  return (
    <Card>
      <CardHeader>
        <CardTitle>useLocalStorage</CardTitle>
        <CardDescription>
          브라우저를 새로고침해도 값이 유지됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          저장된 값: <Badge variant="secondary">{name || "(비어있음)"}</Badge>
        </p>
        <Button variant="outline" size="sm" onClick={() => setName("")}>
          초기화
        </Button>
      </CardContent>
    </Card>
  )
}

function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  return (
    <Card>
      <CardHeader>
        <CardTitle>useMediaQuery</CardTitle>
        <CardDescription>
          현재 화면 크기와 환경 설정을 감지합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant={isMobile ? "default" : "outline"}>모바일</Badge>
          <Badge variant={isTablet ? "default" : "outline"}>태블릿</Badge>
          <Badge variant={isDesktop ? "default" : "outline"}>데스크탑</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          다크모드 선호:{" "}
          <Badge variant="secondary">{prefersDark ? "예" : "아니오"}</Badge>
        </p>
      </CardContent>
    </Card>
  )
}

function DebounceDemo() {
  const [text, setText] = useState("")
  const debouncedText = useDebounce(text, 500)

  return (
    <Card>
      <CardHeader>
        <CardTitle>useDebounce</CardTitle>
        <CardDescription>
          입력 후 500ms가 지나면 디바운스된 값이 갱신됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          placeholder="빠르게 타이핑해보세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="text-sm text-muted-foreground">
          <p>
            입력값: <Badge variant="outline">{text || "(비어있음)"}</Badge>
          </p>
          <p className="mt-1">
            디바운스:{" "}
            <Badge variant="secondary">{debouncedText || "(비어있음)"}</Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function ToggleDemo() {
  const [isOn, toggle] = useToggle(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>useToggle</CardTitle>
        <CardDescription>
          간단한 boolean 상태를 토글합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <Button variant={isOn ? "default" : "outline"} onClick={toggle}>
            {isOn ? "ON" : "OFF"}
          </Button>
          <Badge variant={isOn ? "default" : "secondary"}>
            {isOn ? "활성화" : "비활성화"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize()

  return (
    <Card>
      <CardHeader>
        <CardTitle>useWindowSize</CardTitle>
        <CardDescription>
          브라우저 창 크기를 실시간으로 감지합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{width}</p>
            <p className="text-xs text-muted-foreground">너비 (px)</p>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="text-center">
            <p className="text-2xl font-bold">{height}</p>
            <p className="text-xs text-muted-foreground">높이 (px)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function UseHooksTsPage() {
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
        usehooks-ts 예제
      </h1>
      <p className="mt-2 text-muted-foreground">
        실용적인 커스텀 React 훅 사용법을 직접 체험해보세요.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <LocalStorageDemo />
        <MediaQueryDemo />
        <DebounceDemo />
        <ToggleDemo />
        <WindowSizeDemo />
      </div>
    </div>
  )
}
