export const runtime = "nodejs";

import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessName,
      goal,
      currentStage,
      targetMarket,
      mainChallenge,
      timeline,
    } = body;

    const prompt = `
تو یک مشاور حرفه‌ای کسب‌وکار هستی.

بر اساس اطلاعات زیر یک اکشن پلن دقیق تولید کن:

نام پروژه: ${businessName}
هدف: ${goal}
وضعیت: ${currentStage}
بازار: ${targetMarket}
چالش: ${mainChallenge}
زمان: ${timeline}

ساختار:
1. خلاصه
2. هدف
3. تحلیل
4. اولویت‌ها
5. اکشن پلن
6. KPI
7. ریسک‌ها
8. 30/60/90 روز
9. جمع‌بندی
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "تو مشاور ارشد کسب‌وکار هستی.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    return NextResponse.json({
      actionPlan: completion.choices[0]?.message?.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در تولید اکشن پلن" },
      { status: 500 }
    );
  }
}