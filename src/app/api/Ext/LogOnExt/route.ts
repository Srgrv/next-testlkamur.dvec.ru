import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const targetUrl = "https://testlkamur.dvec.ru/Ext/LogOnExt";

  try {
    // Логируем входящие данные
    console.log("🔹 Входящий запрос:", req.method, req.url);

    const requestBody = await req.text();
    console.log("📩 Тело запроса:", requestBody);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Разрешаем доступ для всех доменов
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Указываем разрешенные методы
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Origin", // Разрешаем заголовки
    };

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
      console.log("🔑 Заголовок Authorization найден");
    }

    console.log("🔹 Отправляем запрос на:", targetUrl);

    // Отправляем запрос на целевой сервер
    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: requestBody,
    });

    console.log("🔹 Ответ от сервера:", response.status, response.statusText);

    // Логируем текстовый ответ от сервера
    const data = await response.text();
    console.log("📩 Тело ответа от сервера:", data);

    try {
      // Пробуем распарсить текст как JSON
      const jsonData = JSON.parse(data);
      console.log("📩 Данные от сервера:", JSON.stringify(jsonData, null, 2));

      // Возвращаем данные обратно клиенту
      return NextResponse.json(jsonData, { status: response.status });
    } catch (error: any) {
      // Обработка ошибки при парсинге
      console.error("Ошибка при разборе данных от сервера:", error);
      return NextResponse.json(
        {
          error: "Ответ от сервера не является валидным JSON",
          details: error.message,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    // Обработка ошибок при запросе
    if (error instanceof Error) {
      console.error("❌ Ошибка при запросе к API:", error.message);
      return NextResponse.json(
        { error: "Ошибка при запросе к API", details: error.message },
        { status: 500 }
      );
    }

    // Если ошибка не является экземпляром Error
    console.error("❌ Неизвестная ошибка:", error);
    return NextResponse.json(
      { error: "Неизвестная ошибка при запросе к API" },
      { status: 500 }
    );
  }
}
