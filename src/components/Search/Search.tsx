import React, { ChangeEvent, FC } from "react";
import SearchImg from "@/assets/images/search.svg";
import clsx from "clsx";

interface ISearchProps {
  onChangeValue: (value: string) => void;
  value: string;
  className?: string;
}

const Search: FC<ISearchProps> = ({ onChangeValue, value, className }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    onChangeValue(e.target.value);
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={clsx(
          "input-field rounded-xl w-[90%] mx-auto p-3 cursor-text flex gap-3 items-center shadow-sm 2xl:w-[80%] lg:ml-[20px] lg:mr-0",
          className
        )}
      >
        <img src={SearchImg.src} className="w-[22px] opacity-50 md:w-[20px]" />
        <input
          value={value}
          type="text"
          placeholder="Поиск..."
          className="w-full outline-none text-[16px] flex-1 md:text-[15px] text-primary placeholder:text-[#b89aad] bg-transparent"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;
