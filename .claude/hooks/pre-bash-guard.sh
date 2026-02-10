#!/bin/bash
# PreToolUse 훅: 위험한 Bash 명령어 차단
# rm -rf, sudo, dd, mkfs, 포크폭탄 등 위험한 명령어 실행 방지

# stdin에서 JSON 읽기
json_input=$(cat)

# tool_input.command 필드 추출 (간단한 grep/sed 사용)
command=$(echo "$json_input" | grep -o '"command" *: *"[^"]*"' | head -1 | sed 's/.*: *"\(.*\)"/\1/')

# 위험한 명령어 패턴 정의 (대소문자 무시)
dangerous_patterns=(
  "rm\s+-rf"
  "rm\s+-fr"
  "sudo"
  "dd\s+if="
  "dd\s+of="
  "mkfs"
  ":\(\)\{"  # 포크폭탄 패턴
)

# 각 패턴 검사
for pattern in "${dangerous_patterns[@]}"; do
  # grep으로 패턴 매칭 (대소문자 무시, 확장 정규식)
  if echo "$command" | grep -iEq "$pattern"; then
    echo "❌ 위험한 명령어가 차단되었습니다: $command" >&2
    echo "   차단된 패턴: $pattern" >&2
    echo "   이 명령어는 시스템에 심각한 손상을 줄 수 있습니다." >&2
    exit 1
  fi
done

# 안전한 명령어 - 작업 계속 진행
exit 0
