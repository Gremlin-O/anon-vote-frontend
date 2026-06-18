import Link from "next/link";
import React, { FC } from "react";
import { IPollCategory } from "../api/models";

interface IPollHeaderProps {
  title: string;
  id: string;
  tags: string[];
  category?: IPollCategory;
}

const formatCategoryLabel = (category: IPollCategory) => {
  const path = category.path?.filter((part) => part !== "") ?? [];

  if (path.length > 0) {
    return [...path, category.name].join(" → ");
  }

  return category.name;
};

const PollHeader: FC<IPollHeaderProps> = ({ title, id, tags, category }) => {
  return (
    <div className="flex justify-between border-b border-[#d4c4cf] pb-3 items-start gap-4 md:flex-col">
      <h1 className="font-semibold leading-tight text-[32px] md:text-[22px] text-primary cursor-pointer hover:opacity-80 transition-opacity duration-200">
        <Link href={`/poll/${id}`}>{title}</Link>
      </h1>
      {(category?.name || tags.length > 0) && (
        <div className="flex flex-wrap gap-2 md:gap-1.5 justify-end md:justify-start">
          {category?.name && (
            <span className="category-pill text-[13px] px-2.5 py-0.5 md:text-[12px]">
              {formatCategoryLabel(category)}
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag-pill text-[13px] px-2.5 py-0.5 md:text-[12px]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PollHeader;
