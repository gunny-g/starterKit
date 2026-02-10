#!/bin/bash
# Claude Code 권한 요청 시 Slack 알림 전송
# Hook: PermissionRequest

# 스크립트 절대 경로 기준으로 common-slack.sh 로드
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common-slack.sh"

# stdin에서 JSON 데이터 읽기
input=$(cat)

# 디버그용 (선택사항)
# echo "[DEBUG] PermissionRequest input: $input" >&2

# JSON 필드 추출
session_id=$(extract_json_value "$input" "session_id")
cwd=$(extract_json_value "$input" "cwd")
tool_name=$(extract_json_value "$input" "tool_name")
command=$(extract_nested_json_value "$input" "tool_input" "command")
description=$(extract_nested_json_value "$input" "tool_input" "description")

# 프로젝트명 추출
project_name=$(extract_project_name "$cwd")

# 세션 ID 단축
short_session=$(shorten_session_id "$session_id")

# 현재 시각
timestamp=$(get_timestamp)

# Slack 메시지 조합
message="🔐 *Claude Code 권한 요청*

📁 프로젝트: \`$project_name\`
🛠️ 도구: \`$tool_name\`"

# command가 있으면 추가
if [[ -n "$command" ]]; then
  message="$message
💻 명령어: \`$command\`"
fi

# description이 있으면 추가
if [[ -n "$description" ]]; then
  message="$message
📝 설명: $description"
fi

message="$message

🔑 세션: $short_session
⏰ 시각: $timestamp"

# Slack 메시지 전송 (실패해도 exit 0)
if send_slack_message "$message"; then
  echo "[정보] Slack 권한 요청 알림 전송 완료" >&2
else
  echo "[경고] Slack 권한 요청 알림 전송 실패 (작업은 계속됩니다)" >&2
fi

# 항상 성공으로 반환 (Claude 작업 중단 방지)
exit 0
