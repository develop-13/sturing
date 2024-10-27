"use client";
import React, { useContext, useReducer, useState } from "react";
// 각 템플릿 컴포넌트를 가져옵니다.
import InterestsTemplate from "@/components/templates/matching/InterestsTemplate";
import SkilledTemplate from "@/components/templates/matching/SkilledTemplate";
import ButtonIcon from "../molecules/ButtonIcon";
import Icon from "../atoms/Icon";
import StudyPlaceTemplate from "../templates/matching/StudyPlaceTemplate";
import StudyTypeTemplate from "../templates/matching/StudyTypeTemplate";
import AtmosphereTemplate from "../templates/matching/AtmosphereTemplate";
import Progressbar from "../atoms/Progressbar";
import CompleteTemplate from "../templates/matching/CompleteTemplate";
import Header from "../organisms/Header";
import { useRouter } from "next/navigation";
import {
  MatchingReducer,
  TDispatchFuncs,
  TMatchingState,
  initialState,
  createDispatchFuncs,
} from "@/reducers/matchingReducer";
import { TCategory, TLevel } from "@/types/common";
import { UserStatusContext } from "../organisms/auth-components/UserStatusProvider";

// // 각 Board 컴포넌트 타입을 정의합니다.
// type StudyBoardProps = { title: string; content: string };
// type MembersBoardProps = { members: string[] };

// // board의 가능한 컴포넌트 타입들을 제네릭으로 정의합니다.
// type BoardProps = StudyBoardProps | MembersBoardProps;

// // 컴포넌트 타입 지정: BoardProps에 따라 props가 달라질 수 있습니다.
// type BoardComponent<T extends BoardProps> = React.ComponentType<T>;

// // boardWrapper 함수 정의
// function boardWrapper<T extends BoardProps>(
//   BoardComponent: BoardComponent<T>,
//   boardProps: T
// ) {
//   const newProps = {
//     ...boardProps,
//     additionalProp: "새로운 속성 값", // 추가 속성 예시
//   };

//   return <BoardComponent {...newProps} />;
// }

// // 예시로 사용할 두 컴포넌트
// const StudyBoard: React.FC<StudyBoardProps> = ({ title, content }) => (
//   <div>
//     <h2>{title}</h2>
//     <p>{content}</p>
//   </div>
// );

// const MembersBoard: React.FC<MembersBoardProps> = ({ members }) => (
//   <div>
//     <h2>Members</h2>
//     <ul>
//       {members.map((member, index) => (
//         <li key={index}>{member}</li>
//       ))}
//     </ul>
//   </div>
// );

// // 사용 예시
// const Example = () => (
//   <>
//     {boardWrapper(StudyBoard, { title: "스터디 게시판", content: "내용" })}
//     {boardWrapper(MembersBoard, { members: ["Alice", "Bob"] })}
//   </>
// );

// export default Example;
// 나중에 이런 식으로 리팩토링하기

const steps = [
  // 각 컴포넌트가 사용하는 props 보내주기
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <InterestsTemplate
      userName={userName}
      fieldLevels={state.fieldLevels}
      deleteInterest={DispatchFuncs.deleteInterest}
      addInterest={DispatchFuncs.addInterest}
    />
  ),
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <SkilledTemplate
      interests={state.interests}
      fieldLevels={state.fieldLevels}
      setLevel={DispatchFuncs.setLevel}
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <StudyTypeTemplate
      userName={userName}
      studyTypePreference={state.studyTypePreference}
      setStudyTypePreference={DispatchFuncs.setStudyTypePreference}
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <StudyPlaceTemplate
      userName={userName}
      studyPlacePreference={state.studyPlacePreference}
      addStudyPlacePreference={DispatchFuncs.addStudyPlacePreference}
      deleteStudyPlacePreference={DispatchFuncs.deleteStudyPlacePreference}
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <AtmosphereTemplate
      userName={userName}
      studyAtmospherePreference={state.studyAtmospherePreference}
      addStudyAtmospherePreference={DispatchFuncs.addStudyAtmospherePreference}
      deleteStudyAtmospherePreference={
        DispatchFuncs.deleteStudyAtmospherePreference
      }
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null,
    userEmail?: string | null
  ) => (
    <CompleteTemplate state={state} userName={userName} userEmail={userEmail} />
  ),
];

const validateStep = (step: number, state: TMatchingState) => {
  // 0단계에서 관심분야 선택
  if (step >= 0 && !Object.keys(state.fieldLevels).length) {
    alert("최소 1개 이상의 관심분야를 선택해 주세요");
    return false;
  }

  if (step >= 1) {
    // 1단계에서 관심분야별 수준 선택
    let flag = true;

    Object.values(state.fieldLevels).forEach((value: TLevel | "") => {
      if (value === "") {
        alert("선택하신 관심분야들에 대한 수준을 모두 선택해주세요");
        flag = false;
      }
    });
    return flag;
  }

  //2단계에서 스터디 유형 선택
  if (step >= 2 && !state.studyTypePreference) {
    alert("스터디 선호 유형을 선택해주세요");
    return false;
  }

  // 3단계에서 스터디 선호 지역 선택
  if (step >= 3 && !Object.keys(state.studyPlacePreference).length) {
    alert("스터디 선호지역을 선택해주세요");
    return false;
  }

  // 4단계에서 선호하는 분위기 선택
  if (step >= 4 && !Object.keys(state.studyAtmospherePreference).length) {
    alert("선호하시는 스터디 분위기를 선택해주세요");
    return false;
  }
  return true;
};

function MatchingPage() {
  const { session, handleHasMatchingInfo } = useContext(UserStatusContext);
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(MatchingReducer, initialState);

  let userName = session?.user?.name;
  let userEmail = session?.user?.email;

  console.log(userName);
  // 애초에 서버에서 한 번 렌더링 되고 그 다음에 클라이언트에서 한 번 더 렌더링됨

  const router = useRouter();

  const goPrevStep = () => {
    if (step === 0) {
      // 홈으로 가게 하기'
      router.back();
      return;
    }
    setStep(step - 1);
  };

  const goNextStep = () => {
    //4단계까지 모두 완료된 상태에서 화살표를 누르면 전송

    if (step >= steps.length - 1) {
      router.push("/recommend");
      return;
    }

    let flag = validateStep(step, state);
    if (flag) {
      setStep(step + 1);
    }
  };

  return (
    <div className="px-[16px] h-[100vh] flex flex-col">
      <Header leftSlot={<Icon type="BACK" onClick={() => router.back()} />} />
      {step < steps.length - 1 && ( // 마지막 페이지에는 안 보이게
        <Progressbar currentPage={step} totalPage={steps.length - 1} />
      )}
      {steps[step](state, createDispatchFuncs(dispatch), userName, userEmail)}

      <div className="flex justify-between mt-auto">
        <ButtonIcon theme="gray" type="backward" onClick={goPrevStep} />
        <ButtonIcon theme="primary" type="forward" onClick={goNextStep} />
      </div>
    </div>
  );
}

export default MatchingPage;
