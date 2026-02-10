#!/bin/bash
# Claude Code 작업 완료/세션 종료 시 Slack 알림 전송
# Hook: TaskCompleted, Stop

# 스크립트 절대 경로 기준으로 common-slack.sh 로드
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common-slack.sh"

# stdin에서 JSON 데이터 읽기
input=$(cat)

# 디버그용 (선택사항)
# echo "[DEBUG] TaskCompleted/Stop input: $input" >&2

# JSON 필드 추출
session_id=$(extract_json_value "$input" "session_id")
cwd=$(extract_json_value "$input" "cwd")
task_description=$(extract_json_value "$input" "task_description")
stop_reason=$(extract_json_value "$input" "stop_reason")

# 프로젝트명 추출
project_name=$(extract_project_name "$cwd")

# 세션 ID 단축
short_session=$(shorten_session_id "$session_id")

# 현재 시각
timestamp=$(get_timestamp)

# task_description 존재 여부로 TaskCompleted vs Stop 분기
if [[ -n "$task_description" ]]; then
  # TaskCompleted 메시지
  message="✅ *Claude Code 작업 완료*

📁 프로젝트: \`$project_name\`
📋 작업: $task_description

🔑 세션: $short_session
⏰ 시각: $timestamp"

else
  # Stop 메시지
  # stop_reason이 없으면 기본값 사용
  if [[ -z "$stop_reason" ]]; then
    stop_reason="세션 종료"
  fi

  message="🏁 *Claude Code 세션 종료*

📁 프로젝트: \`$project_name\`
🔚 종료 사유: $stop_reason

🔑 세션: $short_session
⏰ 시각: $timestamp"
fi

# Slack 메시지 전송 (실패해도 exit 0)
if send_slack_message "$message"; then
  echo "[정보] Slack 작업 완료 알림 전송 완료" >&2
else
  echo "[경고] Slack 작업 완료 알림 전송 실패 (작업은 계속됩니다)" >&2
fi

# 항상 성공으로 반환 (Claude 작업 중단 방지)
exit 0
