import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import StudyInfoItem from "./InfoBox";

function StudyList() {
  return (
    <div>
      <div className="ml-[16px]">
        <Text size="xl" weight="bold">
          스터디 리스트
        </Text>
      </div>

      <div className="bg-gray-100 px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[16px]">
        <div className="flex gap-[12px]">
          <Button theme="transparent-border" shape="tag">
            <Text size="sm" weight="bold">
              진행 중
            </Text>
          </Button>
          <Button theme="transparent-border" shape="tag">
            <Text size="sm" weight="bold">
              진행 예정
            </Text>
          </Button>
          <Button theme="transparent-border" shape="tag">
            <Text size="sm" weight="bold">
              종료
            </Text>
          </Button>
        </div>

        <StudyInfoItem theme="gradient">
          <InfoTags theme="transparent">
            <Button theme="transparent" shape="tag">
              <Text size="xs" weight="bold" color="gray-700">
                오프라인
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Text size="xs" weight="bold" color="gray-700">
                06.03~06.21
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Text size="xs" weight="bold" color="gray-700">
                종로구
              </Text>
            </Button>
          </InfoTags>
          <Text size="base" weight="bold">
            UXUI 디자이너 본질 강화 피그마 스터디{" "}
          </Text>
          <Divider type="row" my={8} />
          <InfoTags theme="white">
            <Button theme="transparent" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="gray-700">
                팀원 4명
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="gray-700">
                매주 토요일
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="gray-700">
                사진인증
              </Text>
            </Button>
          </InfoTags>
        </StudyInfoItem>

        <StudyInfoItem theme="gradient">
          <InfoTags theme="transparent">
            <Button theme="transparent" shape="tag">
              <Text size="xs" weight="bold" color="gray-700">
                오프라인
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Text size="xs" weight="bold" color="gray-700">
                06.03~06.21
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Text size="xs" weight="bold" color="gray-700">
                종로구
              </Text>
            </Button>
          </InfoTags>
          <Text size="base" weight="bold">
            UXUI 디자이너 본질 강화 피그마 스터디{" "}
          </Text>
          <Divider type="row" my={8} />
          <InfoTags theme="white">
            <Button theme="transparent" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="gray-700">
                팀원 4명
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="gray-700">
                매주 토요일
              </Text>
            </Button>
            <Button theme="transparent" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="gray-700">
                사진인증
              </Text>
            </Button>
          </InfoTags>
        </StudyInfoItem>
      </div>
    </div>
  );
}

export default StudyList;
