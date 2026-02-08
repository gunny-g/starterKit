"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// 회원가입 폼 스키마
const signupSchema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })

// 문의하기 폼 스키마
const contactSchema = z.object({
  subject: z.string().min(1, "제목을 입력해주세요."),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다."),
  newsletter: z.boolean(),
})

type SignupFormValues = z.infer<typeof signupSchema>
type ContactFormValues = z.infer<typeof contactSchema>

function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  })

  function onSubmit(data: SignupFormValues) {
    toast.success(`환영합니다, ${data.name}님!`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>
          비밀번호 확인과 실시간 유효성 검증을 포함한 폼 예제
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>8자 이상 입력해주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              가입하기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "", message: "", newsletter: false },
  })

  function onSubmit(data: ContactFormValues) {
    toast.success(`문의가 접수되었습니다: ${data.subject}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>문의하기</CardTitle>
        <CardDescription>
          Textarea, Switch 등을 활용한 문의 폼 예제
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="문의 제목" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메시지</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="문의 내용을 입력해주세요."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>뉴스레터 구독</FormLabel>
                    <FormDescription>
                      새로운 소식을 이메일로 받아보세요.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              보내기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function FormExamplePage() {
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
        폼 예제
      </h1>
      <p className="mt-2 text-muted-foreground">
        react-hook-form + Zod를 활용한 다양한 폼 패턴입니다.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <SignupForm />
        <ContactForm />
      </div>
    </div>
  )
}
