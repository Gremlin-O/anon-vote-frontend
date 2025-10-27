import Link from "next/link";
import React, { FC } from "react";

interface IPollHeaderProps {
  title: string;
  id: string;
  tags: string[];
}

const PollHeader: FC<IPollHeaderProps> = ({ title, id, tags }) => {
  return (
    <div className="flex justify-between border-b border-[#7b1258] items-center md:inline-block">
      <h1 className="font-semibold text-[40px] md:text-[25px] text-primary cursor-pointer">
        <Link href={`/poll/${id}`}>{title}</Link>
      </h1>
      <div className="flex flex-wrap gap-[10px] md:gap-[5px] ">
        {tags.map((tag) => {
          return (
            <p
              key={tag}
              className="text-primary text-[20px] text-black text-shadow-amber-200 font-semibold text-shadow-[2px_2px_3px] md:text-[16px] sm:text-[14px]"
            >
              #{tag}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default PollHeader;
