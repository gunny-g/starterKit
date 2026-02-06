import { Users, CreditCard, Activity, TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 통계 카드 샘플 데이터
const stats = [
  { title: "총 사용자", value: "2,350", change: "+12.5%", icon: Users },
  { title: "매출", value: "₩45,231,000", change: "+8.2%", icon: CreditCard },
  { title: "활성 세션", value: "573", change: "+3.1%", icon: Activity },
  { title: "성장률", value: "24.5%", change: "+4.3%", icon: TrendingUp },
]

// 최근 활동 샘플 데이터
const recentActivities = [
  { id: 1, user: "김철수", action: "새 프로젝트 생성", status: "완료", date: "2025-01-15" },
  { id: 2, user: "이영희", action: "결제 처리", status: "진행중", date: "2025-01-15" },
  { id: 3, user: "박민수", action: "보고서 다운로드", status: "완료", date: "2025-01-14" },
  { id: 4, user: "정수진", action: "팀원 초대", status: "대기", date: "2025-01-14" },
  { id: 5, user: "최동현", action: "설정 변경", status: "완료", date: "2025-01-13" },
]

// 상태별 배지 variant 매핑
function getStatusVariant(status: string) {
  switch (status) {
    case "완료":
      return "default" as const
    case "진행중":
      return "secondary" as const
    case "대기":
      return "outline" as const
    default:
      return "default" as const
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">대시보드</h1>

      {/* 통계 카드 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                전월 대비{" "}
                <span className="text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 최근 활동 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>최근 사용자 활동 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    {activity.user}
                  </TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(activity.status)}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
