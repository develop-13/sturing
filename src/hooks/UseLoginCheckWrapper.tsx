"use client";
import useLoginCheck from "@/hooks/useLoginCheck";

export default function UseLoginCheckWrapper() {
  if (typeof window !== "undefined") {
    useLoginCheck(); // 클라이언트에서만 호출
  }

  return null; // UI를 렌더링하지 않음
}
