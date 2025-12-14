import React, { FC, useEffect, useRef, useState } from "react";
import { fetchCategoriesByName, ICategory } from "./fetchCategoriesByName";
import clsx from "clsx";
import CategoryOptionItem from "./CategoryOptionItem";

interface SelectCategoryProps {
  isActive: boolean;
  onChange: (category?: ICategory) => void;
  value?: ICategory;
}

const SelectCategory: FC<SelectCategoryProps> = ({
  onChange,
  value,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentCategories, setCurrentCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const callback = () => {
      setIsOpen(false);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("click", callback);
    }

    return () => {
      window.removeEventListener("click", callback);
    };
  }, [setIsOpen]);
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      const data = await fetchCategoriesByName(inputValue);
      setCurrentCategories(data);
    }, 300);
  }, [inputValue]);

  useEffect(() => {
    if (value) {
      setInputValue(value.name);
    }
  }, [value, setInputValue]);

  return (
    <div
      className=" mb-[20px] w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        onFocus={() => setIsOpen(true)}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
          onChange(undefined);
        }}
        type="text"
        placeholder="Введите категорию опроса"
        className={clsx(
          "border-medium rounded-[5px] p-[8px] text-[16px] outline-0 w-full duration-100 bg-white text-primary",
          {
            "rounded-b-none": isOpen,
            "rounded-b-[5px]": !isOpen,
            inactive: !isActive,
          }
        )}
      />
      {isOpen && (
        <div className="absolute left-0 w-full flex flex-col max-h-[300px] scrollbar-hide  overflow-auto bg-white border-medium border-b-0! border-t-0! rounded-[5px] rounded-t-none border-t-0 rounded-b-[10px]">
          {currentCategories?.map((category, categoryInd) => {
            return (
              <CategoryOptionItem
                category={category}
                onChange={(name) => {
                  setIsOpen(false);
                  onChange(category);
                }}
                key={category.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
