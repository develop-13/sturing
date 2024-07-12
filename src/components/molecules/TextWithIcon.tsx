import NewIcon, {NewIconProps} from "@/components/atoms/NewIcon";
import Text, {Props as TextProps} from "@/components/atoms/Text";

// 컴포넌트를 결합하는 예제. 기존의 Component를 건드리지 않고 결합합니다.
// 각 Component의 props를 import해서 결합합니다.
// show는 결합한 후에도 새로운 props를 추가할 수 있음을 나타내기위한 예시입니다.
// 핵심은 기존코드를 삭제하지않고 자유자재로 분리/결합할 수 있는 생각을 하는겁니다.(기존 시스템을 무너트리지 않는 것이 핵심)
// 파일을 지나치게 분리하거나 너무 많은 변수,상수 사용은 가독성을 떨어트립니다. 항상 정리, 또 정리.

type TextWithIconProps = NewIconProps&TextProps&{show?:boolean}
export default const TextWithIcon = ({show,datas,children,...props}:TextWithIconProps)=>{
    return (
        <div className={"inline"}>
            {
                show &&<NewIcon {...props} />
            }
            <Text datas={datas}>{children}</Text>
        </div>
    )
}
