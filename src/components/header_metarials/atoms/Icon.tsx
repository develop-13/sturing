"use client";
import React from "react";
import { VscBell } from "react-icons/vsc";
import IconFormat from "../../common/atoms/IconFormat";
import { IconType } from "react-icons";
import Image from "next/image";

type TIconData = {
	type: "BELL" | "CHECKED" | "SVG" | "SRC";
	svg?: () => {};
	src?: string;
	size: number;
};

function Icon(props: TIconData) {
	const { type, svg, src, size } = props;

	switch (type) {
		case "BELL":
			return (
				<div>
					<IconFormat
						onClick={() => {
							console.log("bell icon clicked!");
						}}
						icon={<VscBell />}
					/>
				</div>
			);
		case "CHECKED":
			break;
		case "SVG":
			return (
				<>
					<Image src={src ? src : ""} alt={""} />
				</>
			);
	}
	return <></>;
}

export default Icon;
