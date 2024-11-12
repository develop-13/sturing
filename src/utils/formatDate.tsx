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
