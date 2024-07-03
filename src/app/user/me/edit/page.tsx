import CommonMarginDIv from "@/components/atoms/CommonMarginDIv";
import Icon from "@/components/common/atoms/Icon";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";

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
        <h1 className="text-[18px] font-bold">기본정보</h1>
      </CommonMarginDIv>
    </div>
  );
}

export default EditMePage;
