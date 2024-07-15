"use client";
import Icon from "../atoms/Icon";
import ButtonLabel from "../molecules/ButtonLabel";

export default function StudyCategory() {
    let isDragging = false;
    const dragging = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        if (!isDragging) return;
        e.currentTarget.scrollLeft -= e.movementX;
    };

    return (
        <>
            <div className="relative overflow-x-hidden">
                <ul
                    className="flex gap-2 overflow-x-hidden list-none px-2"
                    onMouseMove={dragging}
                    onMouseDown={() => (isDragging = true)}
                    onMouseUp={() => (isDragging = false)}
                    onMouseLeave={() => (isDragging = false)}
                >
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="DESIGN" />,
                            text: "디자인",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="TECH" />,
                            text: "개발·테크",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="MARKETING" />,
                            text: "마케팅",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="BUSINESS" />,
                            text: "비즈니스",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="ECONOMY" />,
                            text: "경제",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="LANGUAGE" />,
                            text: "외국어",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="CERTIFICATION" />,
                            text: "자격증",
                        }}
                    />
                    <ButtonLabel
                        datas={{
                            theme: "ordinary",
                            role: "category",
                            icon: <Icon type="TEMPORALSAVE" />,
                            text: "자기계발",
                        }}
                    />
                </ul>
            </div>
        </>
    );
}
