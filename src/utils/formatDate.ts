export function formatDate(dateString: string, req: "full" | "month-day") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  switch (req) {
    case "full":
      return `${year}.${month}.${day}`;

    case "month-day":
      return `${month}.${day}`;
  }
}

export function getDateInfo(targetDate: Date) {
  if (!(targetDate instanceof Date)) {
    throw new Error("targetDate는 Date 타입이어야 합니다.");
  }

  // 오늘 날짜
  const today = new Date();

  // 월과 일 추출 (1월이 0부터 시작하므로 +1)
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  // 날짜 차이 계산 (밀리초 단위로 계산 후 일 단위로 변환)
  const timeDifference =
    targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  // 결과 반환
  return {
    month,
    day,
    dayDifference,
  };
}
