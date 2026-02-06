import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// 프로필 시범 페이지 (더미 데이터)
export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">프로필</h1>
        <p className="text-muted-foreground">계정 정보를 확인하고 수정할 수 있습니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>프로필 사진과 개인 정보를 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 아바타 */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">U</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">사용자</p>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
          </div>

          {/* 입력 필드 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" defaultValue="사용자" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" type="tel" defaultValue="010-1234-5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">역할</Label>
              <Input id="role" defaultValue="관리자" disabled />
            </div>
          </div>

          <Button>저장</Button>
        </CardContent>
      </Card>
    </div>
  )
}
