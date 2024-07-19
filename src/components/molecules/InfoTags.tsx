import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "./Button";

type TDatePlace = {
  type: "date-place";
  date: string;
  place: string;
};
type TMeetingDatePlace = {
  type: "meetingType-date-place";
  meetingType: "offline" | "online";
  date: string;
  place: string;
};
type TMemberDayPhoto = {
  type: "member-day-photo";
  member: number;
  photo: boolean;
  day: string;
};
type TTimePlace = {
  type: "time-place";
  place: string;
  time: string;
};

type TInfoContent =
  | TMeetingDatePlace
  | TDatePlace
  | TMemberDayPhoto
  | TTimePlace;

export function InfoTagContents(props: TInfoContent) {
  switch (props.type) {
    case "time-place":
      return (
        <div className="flex">
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              {props.place}
            </Text>
          </Button>
          <div className="divider"></div>
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              {props.time}
            </Text>
          </Button>
        </div>
      );
    case "member-day-photo":
      return (
        <div className="flex">
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Icon type="CHECKED" />
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              팀원 {props.member} 명
            </Text>
          </Button>
          <div className="divider"></div>
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Icon type="CHECKED" />
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              {props.day}
            </Text>
          </Button>
          <div className="divider"></div>
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Icon type="CHECKED" />
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              사진인증
            </Text>
          </Button>
        </div>
      );

    case "meetingType-date-place":
      return (
        <div className="flex">
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              {props.meetingType}
            </Text>
          </Button>
          <div className="divider"></div>
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              {props.date}
            </Text>
          </Button>
          <div className="divider"></div>
          <Button props={{ box: { theme: "transparent", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "gray-700" }}>
              {props.place}
            </Text>
          </Button>
        </div>
      );
  }
}

type TTheme = "gray" | "transparent" | "white";

function InfoTags({
  theme,
  children,
}: {
  theme: TTheme;
  children: React.ReactNode;
}) {
  let tagsStyle = "";

  switch (theme) {
    case "gray":
      tagsStyle += "bg-gray-100 ";
      break;

    case "white":
      tagsStyle += "bg-white ";
      break;

    case "transparent":
      tagsStyle += "bg-transparent ";
      break;
  }

  return <div className={tagsStyle}>{children}</div>;
}

export default InfoTags;
