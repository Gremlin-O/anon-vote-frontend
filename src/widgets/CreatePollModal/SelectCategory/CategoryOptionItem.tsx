import React, { FC } from "react";
import { ICategory } from "./fetchCategoriesByName";

const CategoryOptionItem: FC<{
  category: ICategory;
  onChange: (name: string) => void;
}> = ({ category, onChange }) => {
  return (
    <div
      key={category.id}
      className="px-3 py-2.5 cursor-pointer duration-150 hover:bg-[#f0e8ee] border-b border-[#d4c4cf] last:border-b-0"
      onClick={() => onChange(category.name)}
    >
      <div className="flex gap-2 max-w-full overflow-x-auto scrollbar-hide items-center">
        {category.path.map((pathEl, pathElInd) => (
          <span
            key={pathElInd}
            className="whitespace-nowrap inline-flex items-center gap-1.5 text-[#8a6278] font-medium text-[14px]"
          >
            {pathEl !== "" ? pathEl : "корень"}{" "}
            <span className="text-[#b89aad]">→</span>
          </span>
        ))}
        <span className="inline-block min-w-fit text-primary font-semibold text-[14px]">
          {category.name}
        </span>
      </div>
    </div>
  );
};

export default CategoryOptionItem;
