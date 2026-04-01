import React, { FC } from "react";
import { ICategory } from "./fetchCategoriesByName";

const CategoryOptionItem: FC<{
  category: ICategory;
  onChange: (name: string) => void;
}> = ({ category, onChange }) => {
  return (
    <div
      key={category.id}
      className=" p-[5px] cursor-pointer duration-100 hover:bg-gray-100 border-bold border-t-0! border-r-0! border-l-0! rounded-[10px]"
      onClick={() => {
        onChange(category.name);
      }}
    >
      <div className="flex gap-[10px] max-w-full overflow-x-auto scrollbar-hide">
        {category.path.map((pathEl, pathElInd) => {
          return (
            <p
              key={pathElInd}
              className="whitespace-nowrap  inline-block text-primary font-bold text-[18px] text-secondary"
            >
              {pathEl !== "" ? pathEl : "корень"}{" "}
              <span className="">&#8594;</span>
            </p>
          );
        })}
        <p className="inline-block min-w-fit text-primary font-bold text-[18px]">
          {category.name}
        </p>
      </div>
    </div>
  );
};

export default CategoryOptionItem;
