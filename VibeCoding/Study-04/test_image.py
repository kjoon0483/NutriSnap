# 생성일시: 2026-04-07 14:10
# 이미지 인식 테스트 - google/gemma-3-27b-it:free

import sys
import requests
from dotenv import load_dotenv
import os

sys.stdout.reconfigure(encoding="utf-8")

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

# 공개 테스트 이미지 (고양이 사진)
IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/320px-Cat_November_2010-1a.jpg"

response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "model": "google/gemma-3-27b-it:free",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "이 이미지에 무엇이 있나요? 한국어로 설명해주세요."},
                    {"type": "image_url", "image_url": {"url": IMAGE_URL}},
                ],
            }
        ],
    },
)

data = response.json()
print("=== 이미지 인식 테스트 ===")
print(f"상태 코드: {response.status_code}")
if "choices" in data:
    print(f"모델: {data.get('model')}")
    print(f"응답:\n{data['choices'][0]['message']['content']}")
else:
    print(f"오류: {data}")
