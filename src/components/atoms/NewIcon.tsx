import {ReactElement} from "react"
import { IoCheckmark } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import {IconFormat, TIconData} from "@/components/atoms/Icon";
type NEW_TYPE="bell"|"checked"|"back"
    // "FORWARD"
    // | "BOOKMARK"
    // | "CLOSE"
    // | "SEARCH"
    // | "CANCEL"
    // | "TEMPORALSAVE"
    // | "CHATBOX"
    // | "LOGO"
    // | "MENU"
    // | "MORE"
    // | "SHARE"
    // | "USER"
    // | "FILTER"
    // | "CAMERA"
    // | "DESIGN"
    // | "TECH"
    // | "BUSINESS"
    // | "MARKETING"
    // | "ECONOMY"
    // | "LANGUAGE"
    // | "CERTIFICATION"
    // | "SELFDEVELOP";
type IconDataSetType = Record<NEW_TYPE, {
    icon?:ReactElement
    size?:number
    color?:string
}>;
const IconDataSet:IconDataSetType = {
    "bell":{
        icon:<VscBell />,
    },
    "checked":{
        icon:<IoCheckmark />,
    },
    "back":{
        icon:<IoIosArrowBack />,
    }

}

// 기존의 Icon 컴포넌트를 재활용해보았습니다.
// switch문을 통해 너무 많이 반복되는 부분을 줄이고, 달라지는 부분만 type별로 나누었습니다.

export type NewIconProps = Omit<TIconData,"type">&{type:NEW_TYPE}

export default function NewIcon({color,onClick,type}:NewIconProps){
    const currentData = IconDataSet[type]
    const DEFAULT_SIZE=24
    return (
        <IconFormat
            onClick={onClick}
            icon={currentData.icon}
            size={currentData.size??DEFAULT_SIZE}
        />
    )
}
