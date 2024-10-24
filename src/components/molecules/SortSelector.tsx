import { TStudyItem } from "@/types/study";
import { useEffect, useState } from "react";

type TSortSelector = {
  searchResults: TStudyItem[];
  handleSetSearchResults: (studies: TStudyItem[]) => void;
};
type TSortType = "recent" | "earliest";

function SortSelector({
  searchResults,
  handleSetSearchResults,
}: TSortSelector) {
  const [sortBy, setSortBy] = useState<TSortType>("recent");

  const handlerSetSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as TSortType);
  };

  useEffect(() => {
    let sortedResults: TStudyItem[] = [];
    switch (sortBy) {
      case "recent":
        sortedResults = [...searchResults].sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        break;
      case "earliest":
        sortedResults = [...searchResults].sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        break;
      default:
        console.log("존재하지 않는 정렬기준입니다.");
        break;
    }
    handleSetSearchResults(sortedResults);
  }, [sortBy]);

  return (
    <div className="flex justify-end mx-2 mb-3">
      <select onChange={handlerSetSortBy}>
        <option value="recent" key={"recent"}>
          최신순
        </option>
        <option value="earliest" key={"earliest"}>
          오래된 순
        </option>
      </select>
    </div>
  );
}

export default SortSelector;
