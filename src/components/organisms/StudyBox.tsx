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
                <div className="flex flex-row gap-2 pt-2">
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
            </div>
        </>
    );
}
