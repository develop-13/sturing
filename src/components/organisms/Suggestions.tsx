import React from "react";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";
import { v4 as uuidv4 } from "uuid";

type TSuggestions = {
  currentQuery: string;
  suggestions: string[];
  onSelect: (word: string) => void;
};

const highlightQuery = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <div>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Text size="sm" weight="bold" color="main" key={uuidv4()}>
            {part}
          </Text>
        ) : (
          <Text size="sm" weight="bold" key={uuidv4()}>
            {part}
          </Text>
        )
      )}
    </div>
  );
};

function Suggestions(props: TSuggestions) {
  return (
    <div className="absolute top-[57px] w-full bg-white z-40">
      {props.suggestions.map((suggestion) => (
        <SuggestionItem
          key={uuidv4()}
          currentQuery={props.currentQuery}
          suggestion={suggestion}
          onClick={() => {
            console.log(`onSelect occurred in Suggestions`);
            props.onSelect(suggestion);
          }}
        />
      ))}
    </div>
  );
}

export default Suggestions;

function SuggestionItem({
  currentQuery,
  suggestion,
  onClick,
}: {
  currentQuery: string;
  suggestion: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="w-full h-[41px] flex items-start gap-2 cursor-pointer hover:bg-main-100"
    >
      <Icon type="SEARCH" color="text-gray-500" size={13} />
      {highlightQuery(suggestion, currentQuery)}
    </div>
  );
}
