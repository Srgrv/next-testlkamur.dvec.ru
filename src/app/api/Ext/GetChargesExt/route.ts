import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const targetUrl = "https://testlkamur.dvec.ru/Ext/GetChargesExt";

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.get("authorization") && {
          Authorization: req.headers.get("authorization")!,
        }),
      },
      body: await req.text(),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при запросе к API" },
      { status: 500 }
    );
  }
}
