#!/bin/bash
# PreToolUse 훅: Bash 명령어 실행 로깅
# 타임스탬프와 함께 실행된 명령어를 hook-bash.txt에 기록

# stdin에서 JSON 읽기
json_input=$(cat)

# tool_input.command 필드 추출 (간단한 grep/sed 사용)
# JSON 형식: {"tool_input":{"command":"actual command"}}
command=$(echo "$json_input" | grep -o '"command" *: *"[^"]*"' | head -1 | sed 's/.*: *"\(.*\)"/\1/')

# 타임스탬프 생성
timestamp=$(date '+%Y%m%d:%H%M%S')

# 로그 파일 경로 (프로젝트 루트)
log_file="./hook-bash.txt"

# 로그 기록
echo "[${timestamp}] ${command}" >> "${log_file}"

# 작업 계속 진행 (exit 0)
exit 0
