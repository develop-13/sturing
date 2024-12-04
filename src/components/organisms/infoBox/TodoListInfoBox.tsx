import { TCheckListItem, TStudyMember } from "@/types/study";
import React, { useRef, useState } from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import { v4 } from "uuid";
import CheckListItem from "@/components/molecules/CheckItem/CheckListItem";
import Icon from "@/components/atoms/Icon";

type TTodoListInfoBox = {
  todoList: TCheckListItem[] | undefined;
  date: Date;
  onUpdateCheckList: () => void;
};

const showTodoList = (todoList: TCheckListItem[] | undefined, date: Date) => {
  // todoList 중의 항목중에서 선택된 날짜에 해당하는 항목들을 골라 배열로 반환
  if (!todoList) return []; // todoList가 없으면 빈 배열 반환

  // 주어진 date와 일치하는 checkList 항목만 필터링
  return todoList.filter((todoItem) => {
    // Todo item의 날짜
    const todoDate = new Date(todoItem.date);

    // 비교할 날짜의 시간을 00:00:00으로 초기화
    todoDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0); // 현재 날짜도 00:00:00으로 초기화

    // 날짜만 비교
    return todoDate.getTime() === date.getTime();
  });
};

function TodoListInfoBox(props: TTodoListInfoBox) {
  // 할일을 추가/삭제/수정/체크 할수 있어야 함

  const { todoList: todoListInObj, date, onUpdateCheckList } = props;

  // showTodoList 함수를 호출하여 date에 맞는 todo 항목을 가져옴
  const todoList = showTodoList(todoListInObj, date);
  const [isCreatingNewTodo, setIsCreatingNewTodo] = useState(false);
  // 바깥쪽 클릭하면 닫히기

  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const [newTodoText, setNewTodoText] = useState("");

  const onChangeNewTodoText = (e) => {
    setNewTodoText(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  // 할일을 추가/삭제/수정/체크 할수 있어야 함
  const toggleCheck = () => {};
  const addNewTodo = () => {};

  return (
    <InfoBox theme="white">
      <div className="flex justify-between">
        <Text size="base" weight="bold">
          체크 리스트
        </Text>
        <Icon
          type="PLUS"
          onClick={() => {
            setIsCreatingNewTodo(true);
          }}
        />
      </div>
      <ul className="flex flex-col gap-4">
        {todoList.length > 0 ? (
          todoList.map((todoItem) => (
            <CheckListItem
              type="row"
              isChecked={todoItem.done}
              text={todoItem.content}
              className="justify-start gap-3"
              key={v4()}
              toggleCheck={() => {
                toggleCheck();
              }}
            />
          ))
        ) : (
          <Text>No tasks for today</Text>
        )}
        {isCreatingNewTodo && (
          <div className="flex gap-2">
            <input
              placeholder="할일을 추가해주세요"
              type="text"
              ref={inputRef}
              value={newTodoText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={onChangeNewTodoText}
            />
            <button>할 일 추가</button>
          </div>
        )}
      </ul>
    </InfoBox>
  );
}

export default TodoListInfoBox;
