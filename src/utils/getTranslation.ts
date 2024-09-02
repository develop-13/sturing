const translator: { [key: string]: string } = {
  categories: "분야",
  membernum: "인원",
  locations: "지역",
  duration: "기간",
  levels: "수준",
  roles: "역할",
};

function getTranslation(text: string): string | undefined {
  return translator[text.toLowerCase()] || undefined;
}

export default getTranslation;
