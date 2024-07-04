import Button from "../atoms/Button";
import StudyImageBox from "../molecules/StudyImageBox";

export default function StudyBox({ props }: { props: TStudy }) {
    return (
        <>
            <div className="flex flex-col">
                <StudyImageBox
                    src={props.src}
                    date={props.date}
                    isChecked={false}
                />
                <div className="flex flex-row gap-2 pt-3">
                    <Button
                        fontsize={12}
                        height={22}
                        text={props.type}
                        theme="PRIMARY"
                    />
                    <Button
                        fontsize={12}
                        height={22}
                        text={props.category}
                        theme="SECONDARY"
                    />
                </div>
                <text className="text-[16px] font-bold pt-2">
                    {props.title}
                </text>
                <div className="flex flex-row pt-3 text-gray-600 border-b-2 py-2">
                    <text className="text-[12px] font-bold">
                        {props.location}
                    </text>
                </div>
            </div>
        </>
    );
}
