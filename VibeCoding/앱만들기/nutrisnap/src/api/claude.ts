// 생성일시: 2026-05-19

import Anthropic from '@anthropic-ai/sdk';
import { FoodItem } from '../types';

const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? '',
});

const SYSTEM_PROMPT = `너는 영양사 AI야. 음식 사진을 보고 아래 JSON 형식으로만 응답해. 다른 텍스트는 절대 포함하지 마.

{
  "foods": [
    {
      "name": "음식 이름 (한국어)",
      "amount": "1인분 (약 300g)",
      "calories": 숫자,
      "carbs": 숫자,
      "protein": 숫자,
      "fat": 숫자
    }
  ]
}

칼로리와 영양소는 1인분 기준. 사진에 여러 음식이 있으면 각각 분리해서 나열해.`;

export async function analyzeFoodImage(base64Image: string): Promise<FoodItem[]> {
  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            type: 'text',
            text: '이 음식의 칼로리와 영양소를 분석해줘.',
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const parsed = JSON.parse(text);
  return parsed.foods as FoodItem[];
}
