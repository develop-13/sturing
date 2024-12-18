export const formatRange = (start: Date | null, end: Date | null): string => {
  if (!start) return "";
  const startString = `${start.getFullYear()}.${
    start.getMonth() + 1
  }.${start.getDate()}`;
  if (!end) return startString;
  const endString = `${end.getFullYear()}.${
    end.getMonth() + 1
  }.${end.getDate()}`;
  return `${startString}~${endString}`;
};

// Generate calendar grid
export const generateCalendar = (visibleMonth: Date) => {
  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  // visibleMonth -- 어떤 달의 1일.. 을 기준으로 달력 데이터를 생성
  // 달력데이터는 week으로 이루어짐

  const firstDayOfMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  );
  const totalDays = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  // 해당달의 1일의 요일

  // Fill the first week with nulls until the first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  // 일요일부터 해당달의 1일의 요일까지는 표시하지 않을거니까 null을 넣음
  // 하지만 어쨌든 달력에 존재는 해야하니까 넣는거임

  for (let date = 1; date <= totalDays; date++) {
    const dayDate = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      date
    ); // 1일부터 해당달의 마지막 일자까지 각 달의 년,월,일을 넣음
    currentWeek.push(dayDate);

    if (currentWeek.length === 7) {
      // 일주일 마다 끊어서 넣음
      weeks.push(currentWeek);
      currentWeek = [];
    }
  } //해당달의 1일부터 마지막날까지 다 구한뒤에

  // Fill the last week with nulls if necessary
  // 31일 이후에 마지막 주의 날짜가 남았다면 빈칸 처리
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};
