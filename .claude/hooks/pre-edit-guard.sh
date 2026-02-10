#!/bin/bash
# PreToolUse 훅: 중요 파일 수정 차단
# .env, 락 파일, 훅 설정 등 중요 파일의 무단 수정 방지

# stdin에서 JSON 읽기
json_input=$(cat)

# tool_input.file_path 필드 추출 (간단한 grep/sed 사용)
file_path=$(echo "$json_input" | grep -o '"file_path" *: *"[^"]*"' | head -1 | sed 's/.*: *"\(.*\)"/\1/')

# 파일명만 추출 (basename)
file_name=$(basename "$file_path")

# 보호 대상 파일 패턴 정의
protected_patterns=(
  "^\.env$"
  "^\.env\.local$"
  "^\.env\..*\.local$"
  "^package-lock\.json$"
  "^pnpm-lock\.yaml$"
  "^yarn\.lock$"
  "^\.claude/settings\.local\.json$"
)

# 각 패턴 검사
for pattern in "${protected_patterns[@]}"; do
  # 파일명 또는 전체 경로로 패턴 매칭
  if echo "$file_name" | grep -Eq "$pattern" || echo "$file_path" | grep -Eq "$pattern"; then
    echo "🔒 중요 파일 수정이 차단되었습니다: $file_path" >&2
    echo "   이 파일은 프로젝트 핵심 설정 파일로 보호되고 있습니다." >&2
    echo "   수정이 필요한 경우 직접 편집하거나 훅 설정을 임시 비활성화하세요." >&2
    exit 1
  fi
done

# 안전한 파일 - 작업 계속 진행
exit 0
