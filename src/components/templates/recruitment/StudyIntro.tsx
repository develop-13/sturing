import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import { categories } from "@/db/categories";

function StudyIntro() {
  return (
    <section className="py-4 flex flex-col gap-5">
      <Text size="xl" weight="bold">
        스터디에 대해 소개해 주세요
      </Text>

      <div className="flex flex-col gap-3 thumbnail">
        <Text size="sm" weight="bold">
          스터디 대표 사진
        </Text>
        <div className="w-[70px] h-[70px] rounded-[5px] border border-gray-300 flex items-center justify-center">
          <Icon type="CAMERA" size={30} />
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col gap-3 title">
        <Text size="sm" weight="bold">
          스터디 모집글 제목
        </Text>
        <div className="w-full border border-gray-300 rounded-[5px] px-4 py-3 flex items-center">
          <input
            type="text"
            placeholder="내 스터디를 돋보이게 하는 한마디 (최소 5자 이상)"
            className="w-full h-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
          />
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col gap-3 categories">
        <Text size="sm" weight="bold">
          카테고리
        </Text>
        <div className="flex gap-2 flex-wrap">
          {categories.map((data) => (
            <Button theme="ordinary" shape="tag" key={data.id}>
              <Text size="xs" weight="bold" color="gray-600">
                {data.id}
              </Text>
            </Button>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col gap-3 intro">
        <label htmlFor="intro">
          <Text size="sm" weight="bold">
            자기소개
          </Text>
        </label>
        <textarea
          id="intro"
          placeholder="소개글을 입력해 주세요 (최소 20자 필수)"
          cols={30}
          rows={10}
          className="px-4 py-3 border border-gray-300 resize-none outline-none rounded-[5px] placeholder: text-[14px] placeholder:font-medium placeholder:text-gray-600"
        ></textarea>
      </div>
      {/*  */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Button theme="ordinary" shape="tag">
            <Text size="xs" weight="bold" color="gray-600">
              온라인
            </Text>
          </Button>
          <Button theme="ordinary" shape="tag">
            <Text size="xs" weight="bold" color="gray-600">
              오프라인
            </Text>
          </Button>
        </div>
        <div className="flex items-center p-3 gap-1 w-full rounded-[5px] border border-gray-300">
          <Icon type="LOCATION" />
          <Text size="sm" weight="bold" color="gray-600">
            희망 스터디 위치를 등록해 주세요
          </Text>
        </div>
        <Button theme="ordinary" shape="border-dot">
          <Icon type="ADD" />
          <Text size="sm" weight="bold" color="gray-600">
            추가하기
          </Text>
        </Button>
      </div>
    </section>
  );
}
// 카테고리 부분 useContext로 전역에서 뿌려주어서 중복을 제거해볼까?
export default StudyIntro;
