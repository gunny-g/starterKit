#!/bin/bash
# Claude Code Slack Webhook 공통 함수 라이브러리
# jq 없이 grep/sed를 사용한 JSON 파싱 및 Slack 메시지 전송

# 환경 변수 로드 함수
load_slack_config() {
  local env_file="$(dirname "$(dirname "$0")")/.env.hooks"

  if [[ ! -f "$env_file" ]]; then
    echo "[경고] .env.hooks 파일을 찾을 수 없습니다: $env_file" >&2
    echo "[힌트] .env.hooks.example을 참고하여 설정 파일을 생성하세요" >&2
    return 1
  fi

  # shellcheck source=/dev/null
  source "$env_file"

  if [[ -z "$SLACK_WEBHOOK_URL" ]]; then
    echo "[경고] SLACK_WEBHOOK_URL이 설정되지 않았습니다" >&2
    return 1
  fi

  return 0
}

# JSON에서 단순 필드 추출 (jq 없이)
# 사용법: extract_json_value "$json" "field_name"
extract_json_value() {
  local json="$1"
  local field="$2"

  # "field_name": "value" 형식 추출
  local value=$(echo "$json" | grep -o "\"$field\" *: *\"[^\"]*\"" | head -1 | sed 's/.*: *"\(.*\)".*/\1/')

  echo "$value"
}

# JSON에서 중첩 필드 추출 (예: tool_input.command)
# 사용법: extract_nested_json_value "$json" "parent_field" "child_field"
extract_nested_json_value() {
  local json="$1"
  local parent="$2"
  local child="$3"

  # 부모 객체 추출: "parent": {...}
  local parent_obj=$(echo "$json" | grep -oP "\"$parent\" *: *\{[^}]*\}")

  if [[ -z "$parent_obj" ]]; then
    return 1
  fi

  # 자식 필드 추출
  local value=$(echo "$parent_obj" | grep -o "\"$child\" *: *\"[^\"]*\"" | head -1 | sed 's/.*: *"\(.*\)".*/\1/')

  echo "$value"
}

# Slack 메시지 전송
# 사용법: send_slack_message "메시지 내용"
send_slack_message() {
  local message="$1"

  if ! load_slack_config; then
    return 1
  fi

  # JSON payload 생성 (특수 문자 이스케이프)
  local escaped_message=$(echo "$message" | sed 's/\\/\\\\/g; s/"/\\"/g; s/$/\\n/' | tr -d '\n')
  local payload="{\"text\":\"${escaped_message}\"}"

  # curl로 Slack webhook 호출 (타임아웃 10초, 에러 무시)
  local response=$(curl -s -X POST \
    -H 'Content-Type: application/json' \
    --max-time 10 \
    -d "$payload" \
    "$SLACK_WEBHOOK_URL" 2>&1)

  local exit_code=$?

  if [[ $exit_code -ne 0 ]]; then
    echo "[경고] Slack 메시지 전송 실패: $response" >&2
    return 1
  fi

  return 0
}

# 현재 시각 포맷 (KST)
get_timestamp() {
  date '+%Y-%m-%d %H:%M:%S'
}

# 세션 ID 단축 (앞 8자리)
shorten_session_id() {
  local session_id="$1"
  echo "${session_id:0:8}"
}

# 프로젝트명 추출 (cwd에서)
extract_project_name() {
  local cwd="$1"
  basename "$cwd"
}

# 스크립트가 직접 실행될 때만 테스트 수행
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "=== common-slack.sh 테스트 ==="

  # JSON 파싱 테스트
  test_json='{"tool_name":"Bash","tool_input":{"command":"git push","description":"Push changes"}}'

  echo "1. extract_json_value 테스트:"
  echo "   tool_name = $(extract_json_value "$test_json" "tool_name")"

  echo "2. extract_nested_json_value 테스트:"
  echo "   tool_input.command = $(extract_nested_json_value "$test_json" "tool_input" "command")"
  echo "   tool_input.description = $(extract_nested_json_value "$test_json" "tool_input" "description")"

  echo "3. get_timestamp 테스트:"
  echo "   $(get_timestamp)"

  echo "4. shorten_session_id 테스트:"
  echo "   $(shorten_session_id "abc123456789")"

  echo "5. extract_project_name 테스트:"
  echo "   $(extract_project_name "/mnt/d/WS/dd_claude_code/courses/starterKit")"

  echo ""
  echo "6. send_slack_message 테스트 (실제 webhook 호출):"
  if send_slack_message "🧪 common-slack.sh 테스트 메시지"; then
    echo "   ✅ 메시지 전송 성공"
  else
    echo "   ❌ 메시지 전송 실패 (설정 확인 필요)"
  fi
fi
