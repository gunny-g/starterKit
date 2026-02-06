"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

// zod 스키마로 폼 유효성 검증 규칙 선언
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  message: z.string().min(10, "메시지는 10글자 이상 입력해주세요."),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function FormPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // 폼 제출 핸들러
  async function onSubmit(data: ContactFormValues) {
    // API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("폼이 성공적으로 제출되었습니다!", {
      description: `${data.name}님, 감사합니다.`,
    })

    form.reset()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">폼 예제</h1>

      <Card>
        <CardHeader>
          <CardTitle>문의하기</CardTitle>
          <CardDescription>
            react-hook-form + zod + ShadcnUI Form 조합의 폼 예제입니다.
            유효성 검증과 Toast 알림을 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* 이름 필드 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="이름을 입력하세요" {...field} />
                    </FormControl>
                    <FormDescription>2글자 이상 입력해주세요.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 이메일 필드 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 메시지 필드 */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메시지</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="문의 내용을 입력하세요"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      10글자 이상 입력해주세요.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 제출 버튼 */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                {form.formState.isSubmitting ? "제출 중..." : "제출하기"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
