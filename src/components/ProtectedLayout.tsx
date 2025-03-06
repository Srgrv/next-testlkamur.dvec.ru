"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [, token, router]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
