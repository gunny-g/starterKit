#!/bin/bash
# PreToolUse 훅: 중요 파일 자동 백업
# CLAUDE.md, package.json 등 중요 파일 수정 전 백업 생성

# stdin에서 JSON 읽기
json_input=$(cat)

# tool_input.file_path 필드 추출 (간단한 grep/sed 사용)
file_path=$(echo "$json_input" | grep -o '"file_path" *: *"[^"]*"' | head -1 | sed 's/.*: *"\(.*\)"/\1/')

# 파일명만 추출 (basename)
file_name=$(basename "$file_path")

# 백업 대상 파일 패턴 정의
backup_patterns=(
  "^CLAUDE\.md$"
  "^package\.json$"
  "^tsconfig\.json$"
  "^components\.json$"
  "^next\.config\.ts$"
  "^\.claude/settings\.local\.json$"
)

# 백업 필요 여부 확인
should_backup=false
for pattern in "${backup_patterns[@]}"; do
  if echo "$file_name" | grep -Eq "$pattern" || echo "$file_path" | grep -Eq "$pattern"; then
    should_backup=true
    break
  fi
done

# 백업 필요 없으면 바로 종료
if [ "$should_backup" = false ]; then
  exit 0
fi

# 파일이 실제로 존재하는지 확인
if [ ! -f "$file_path" ]; then
  # 파일이 없으면 백업 불필요 (새 파일 생성)
  exit 0
fi

# 백업 디렉토리 생성 (날짜별)
backup_date=$(date '+%Y%m%d')
backup_dir=".claude/backups/${backup_date}"
mkdir -p "$backup_dir"

# 백업 파일명 생성 (시간 포함)
backup_time=$(date '+%H%M%S')
backup_file="${backup_dir}/${file_name}.${backup_time}.bak"

# 백업 실행
cp "$file_path" "$backup_file" 2>/dev/null

# 백업 성공 여부 확인
if [ $? -eq 0 ]; then
  echo "💾 백업 생성: ${backup_file}" >&2
else
  echo "⚠️  백업 실패: ${file_path} (작업은 계속 진행됩니다)" >&2
fi

# 백업 실패해도 작업은 계속 진행 (exit 0)
exit 0
