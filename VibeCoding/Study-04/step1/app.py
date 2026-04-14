# 생성일시: 2026-04-07 14:10
# Step 1 - Flask 백엔드: 이미지 업로드 → Gemma 재료 인식

import os
import base64
import requests
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = Flask(__name__)
API_KEY = os.getenv("OPENROUTER_API_KEY")


def get_free_vision_models():
    try:
        res = requests.get(
            "https://openrouter.ai/api/v1/models",
            headers={"Authorization": f"Bearer {API_KEY}"},
            timeout=10,
        )
        models = res.json().get("data", [])
        return [
            m["id"] for m in models
            if ":free" in m["id"]
            and "image" in m.get("architecture", {}).get("input_modalities", [])
        ]
    except Exception:
        return []


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    if "image" not in request.files:
        return jsonify({"error": "이미지가 없습니다."}), 400

    image_file = request.files["image"]
    image_b64 = base64.b64encode(image_file.read()).decode("utf-8")
    mime_type = image_file.mimetype or "image/jpeg"

    vision_models = get_free_vision_models()
    if not vision_models:
        return jsonify({"error": "사용 가능한 이미지 인식 모델이 없습니다. 재료를 직접 입력해주세요."}), 503

    payload = {
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": "이 냉장고 사진을 보고 안에 있는 식재료를 모두 찾아줘. 재료 이름만 한국어로 쉼표로 구분해서 답해줘. 예시: 계란, 당근, 우유, 양파"},
                {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{image_b64}"}},
            ],
        }],
    }

    for model in vision_models:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
            json={"model": model, **payload},
            timeout=30,
        )
        data = response.json()
        if "choices" in data:
            content = data["choices"][0]["message"]["content"]
            ingredients = [i.strip() for i in content.replace("\n", ",").split(",") if i.strip()]
            return jsonify({"ingredients": ingredients, "model": model})

    return jsonify({"error": "이미지 인식 서버가 일시적으로 사용량 초과 상태입니다. 재료를 직접 입력해주세요."}), 503


if __name__ == "__main__":
    app.run(debug=True, port=5000)
