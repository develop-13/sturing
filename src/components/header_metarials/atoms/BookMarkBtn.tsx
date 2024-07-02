"use client";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import IconFormat from "../../common/atoms/IconFormat";

function BookMarkBtn() {
	return (
		<IconFormat
			icon={<CiBookmark />}
			onClick={() => {
				console.log("관심 목록이동 구현해주세요");
			}}
		/>
	);
}

export default BookMarkBtn;
