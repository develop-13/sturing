import { TCheckListItem } from "@/types/study";
import React, { useEffect, useRef, useState } from "react";

import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import { v4 } from "uuid";
import CheckListItem from "@/components/molecules/CheckItem/CheckListItem";
import Icon from "@/components/atoms/Icon";
import {
  postTodo,
  patchTodo,
  deleteTodo as deleteTodo_server,
} from "@/app/joiningStudy/utils/api";
import Box from "@/components/atoms/Box";

type TTodoListInfoBox = {
  todoList: TCheckListItem[];
  myUserEmail: string;
  date: Date;
  studyId: string;
  onUpdateCheckList: (
    myUserEmail: string,
    checkLists: TCheckListItem[]
  ) => void;
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

  const { todoList, date, onUpdateCheckList, myUserEmail, studyId } = props;

  // showTodoList 함수를 호출하여 date에 맞는 todo 항목을 가져옴
  const todayTodoList = showTodoList(todoList, date);
  const [isCreatingNewTodo, setIsCreatingNewTodo] = useState(false);
  // 바깥쪽 클릭하면 닫히기

  const inputRef = useRef(null);

  const [newTodoText, setNewTodoText] = useState("");

  console.log(`inputRef=${inputRef.current}`);

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (
        inputRef.current && // null 체크
        !(inputRef.current as HTMLDivElement).contains(event.target as Node) // 타입 단언 추가
      ) {
        setIsCreatingNewTodo(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    // Cleanup 리스너
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsCreatingNewTodo]);

  const onChangeNewTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  // 할일을 추가/삭제/수정/체크 할수 있어야 함
  const toggleCheck = async (todoId: string, done: boolean) => {
    console.log("toggleCheck called");

    console.log(todoId, studyId);

    const updatedCheckList = todoList.map((todo) =>
      todo.todoId === todoId ? { ...todo, done } : todo
    );

    onUpdateCheckList(myUserEmail, updatedCheckList);
    await patchTodo(studyId, myUserEmail, todoId, done);
  };

  const addNewTodo = async () => {
    console.log("addNewTodo called");

    if (!newTodoText.length) {
      alert("할 일을 입력해주세요");
      return;
    }
    const newTodo = {
      todoId: v4(),
      done: false,
      content: newTodoText,
      date: date,
    };
    const updatedCheckList = [...todoList, newTodo];
    onUpdateCheckList(myUserEmail, updatedCheckList);
    setIsCreatingNewTodo(false);
    await postTodo(studyId, myUserEmail, newTodo);
  };

  const deleteTodo = async (todoId: string) => {
    console.log("deleteTodo called");
    const updatedCheckList = todoList.filter((todo) => todo.todoId !== todoId);
    onUpdateCheckList(myUserEmail, updatedCheckList);
    await deleteTodo_server(studyId, myUserEmail, todoId);
  };

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
            setNewTodoText("");
          }}
        />
      </div>
      <ul className="flex flex-col gap-4">
        {todayTodoList.length > 0 ? (
          todayTodoList.map((todoItem) => (
            <CheckListItem
              type="row"
              isChecked={todoItem.done}
              text={todoItem.content}
              className="justify-start gap-3"
              key={todoItem.todoId}
              handleCheck={() => {
                toggleCheck(todoItem.todoId, !todoItem.done);
              }}
              onRemove={() => deleteTodo(todoItem.todoId)}
            />
          ))
        ) : (
          <Text>No tasks for today</Text>
        )}
        {isCreatingNewTodo && (
          <li
            ref={inputRef}
            className="flex justify-between items-center  px-2 rounded group "
          >
            <input
              className="placeholder:text-xs  focus:outline-none focus:ring-0"
              placeholder="할일을 추가해주세요"
              type="text"
              value={newTodoText}
              onChange={onChangeNewTodoText}
            />
            <Box
              props={{
                onClick: addNewTodo,
                theme: "secondary",
                extraCss:
                  " p-1 rounded-[5px] hover:bg-mainColor hover:text-white ",
              }}
            >
              <Text size="xs" weight="bold">
                할 일 추가
              </Text>
            </Box>
          </li>
        )}
      </ul>
    </InfoBox>
  );
}

export default TodoListInfoBox;
