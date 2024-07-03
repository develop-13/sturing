import CommonMarginDIv from "@/components/atoms/CommonMarginDIv";
import Icon from "@/components/atoms/Icon";
import HeaderForamt from "@/components/organisms/headerForamt";

const userInfoDummy = {
  name: "스터링",
  email: "sturing@kakao.com",
  nickname: "갓생사는스터디원",
  jobs: "비기너",
  age: { age: 23, isPublic: true },
  gender: { gender: "여", isPublic: false },
  place: { place: "서울시 성동구 성수동", isPublic: true },
};

function EditMePage() {
  return (
    <div>
      <HeaderForamt
        icons_left={<Icon type="BACK" />}
        text_center="프로필 수정"
        icons_right={"수정"}
      />

      {/* 이미지 섹션 */}
      <div className="mt-6 mb-5 mx-auto w-[90px] h-[90px] bg-[url('/img/profileImg_example.png')] bg-cover rounded-full relative">
        {/* 사진 */}
        <div className="absolute bottom-0 right-0">
          <Icon type="CAMERA" />
        </div>
      </div>
      <CommonMarginDIv>
        <h1 className="text-[18px] font-bold mb-6">기본정보</h1>
        <section className="border-b border-gray-300">
          <label className="text-[14px] text-gray-700">사용자 이름</label>
          <div className="py-[14px]">
            <input
              type="text"
              className="text-[16px] text-gray-1000 font-bold"
              readOnly
              value={"스터링"}
            />
          </div>
        </section>
      </CommonMarginDIv>
    </div>
  );
}

export default EditMePage;
