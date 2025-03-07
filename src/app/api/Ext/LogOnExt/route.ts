import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const targetUrl = "https://testlkamur.dvec.ru/Ext/LogOnExt";

  try {
    // Логируем входящие данные
    console.log("🔹 Входящий запрос:", req.method, req.url);

    const requestBody = await req.text();
    console.log("📩 Тело запроса:", requestBody);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
      console.log("🔑 Заголовок Authorization найден");
    }

    console.log("🔹 Отправляем запрос на:", targetUrl);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: requestBody,
    });

    console.log("🔹 Ответ от сервера:", response.status, response.statusText);

    const data = await response.json();
    console.log("📩 Данные от сервера:", JSON.stringify(data, null, 2));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("❌ Ошибка при запросе к API:", error);
    return NextResponse.json(
      { error: "Ошибка при запросе к API" },
      { status: 500 }
    );
  }
}
