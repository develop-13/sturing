"use client";

import { MdKeyboardArrowRight } from "react-icons/md";

type TTitleLink = {
  title: string;
  src?: string;
};

export default function TitleLink({ props }: { props: TTitleLink }) {
  return (
    <>
      <div className="flex items-center text-lg font-bold my-4">
        <h1>{props.title}</h1>
        <button className="ml-auto" onClick={() => {}}>
          <MdKeyboardArrowRight />
        </button>
      </div>
    </>
  );
}
