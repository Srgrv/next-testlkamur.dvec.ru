import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Все запросы, начинающиеся с /api, будут перенаправлены
        destination: "https://testlkamur.dvec.ru/:path*", // На этот URL
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Применяем заголовки ко всем запросам, начинающимся с /api
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Разрешаем запросы с любого домена
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          }, // Разрешаем методы
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          }, // Разрешаем заголовки
        ],
      },
    ];
  },
};

export default nextConfig;
