import React from "react";

const StudingCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        {/* Logo and Title */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold">
            stu<span className="text-blue-600">d</span>ing
          </h1>
          <p className="text-gray-600 mt-2">사람과 스터디, 강의를 한 고리로</p>
        </div>

        {/* Message Box */}
        <div className="flex items-center justify-center bg-gray-100">
          <div className="relative bg-white text-center rounded-xl shadow-lg p-6 max-w-md">
            {/* 텍스트 콘텐츠 */}
            <p className="text-gray-700 border-none">
              지금 회원가입하고 <br />
              <span className="text-blue-500 font-bold">나와 맞는 스터디</span>
              에 참가해보세요!
            </p>

            {/* 말풍선 아래쪽 삼각형 */}
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
          </div>
        </div>

        {/* Button */}
        <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center space-x-2 hover:bg-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 0H7a2 2 0 01-2-2V8a2 2 0 012-2h6m-4 4h.01M13 16h.01"
            />
          </svg>
          <span>카카오로 3초 만에 시작하기</span>
        </button>
      </div>
    </div>
  );
};

export default StudingCard;
