# 생성일시: 2026-04-07 14:10
# 텍스트 생성 테스트 - qwen/qwen3.6-plus:free

import sys
import requests
from dotenv import load_dotenv
import os

sys.stdout.reconfigure(encoding="utf-8")

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "model": "qwen/qwen3.6-plus:free",
        "messages": [
            {"role": "user", "content": "안녕하세요! 한국어로 짧게 자기소개를 해주세요."}
        ],
    },
)

data = response.json()
print("=== 텍스트 생성 테스트 ===")
print(f"상태 코드: {response.status_code}")
if "choices" in data:
    print(f"모델: {data.get('model')}")
    print(f"응답:\n{data['choices'][0]['message']['content']}")
else:
    print(f"오류: {data}")
