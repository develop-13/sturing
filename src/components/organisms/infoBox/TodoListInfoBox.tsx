import { TCheckListItem } from "@/types/study";
import React, { useState } from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import { v4 } from "uuid";
import CheckListItem from "@/components/molecules/CheckItem/CheckListItem";
import Icon from "@/components/atoms/Icon";

type TTodoListInfoBox = {
  todoList: TCheckListItem[] | undefined;
  date: Date;
};

const showTodoList = (todoList: TCheckListItem[] | undefined, date: Date) => {
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
  const { todoList, date } = props;

  // showTodoList 함수를 호출하여 date에 맞는 todo 항목을 가져옴
  const filteredTodoList = showTodoList(todoList, date);
  const [isCreatingNewTodo, setIsCreatingNewTodo] = useState(false);
  // 바깥쪽 클릭하면 닫히기

  const handleCheck = () => {};

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
        {filteredTodoList.length > 0 ? (
          filteredTodoList.map((todoItem) => (
            <CheckListItem
              type="row"
              isChecked={todoItem.done}
              text={todoItem.content}
              className="justify-start gap-3"
              key={v4()}
              handleCheck={() => {
                handleCheck();
              }}
            />
          ))
        ) : (
          <Text>No tasks for today</Text>
        )}
        {isCreatingNewTodo && <li>새로운 Todo 생성 중 추가버튼</li>}
      </ul>
    </InfoBox>
  );
}

export default TodoListInfoBox;
