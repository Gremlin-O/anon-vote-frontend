import clsx from "clsx";
import React, { FC, useRef } from "react";
import SearchImg from "@/assets/images/search.svg";
import DeleteSvg from "@/assets/images/close.svg";
import CategoriesModal from "@/widgets/CategoriesModal/CategoriesModal";
import Filter from "@/assets/images/Filter.svg";
import Cross from "@/assets/images/close.svg";

interface IPollTagsInputProps {
  tags: string[];
  search: string;
  inputChange: (tags: string[], search: string) => void;
  className?: string;
  clearCategory: () => void;
  isSelected: boolean;
  modal: {
    show: () => void;
    hide: () => void;
    toggle: () => void;
    isShown: boolean;
  };
}

const PollTagsInput: FC<IPollTagsInputProps> = ({
  tags,
  search,
  inputChange,
  className,
  isSelected,
  clearCategory,
  modal,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const categoriesModal = modal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputChange(tags, e.currentTarget.value);
  };

  const handleDeleteLastTag = () => {
    const updatedTags = tags.slice(0, tags.length - 1);
    inputChange(updatedTags, search);
  };

  const handleDeleteTag = (ind: number) => {
    const updatedTags = tags.filter((t, i) => i !== ind);
    inputChange(updatedTags, search);
  };

  return (
    <div
      className={clsx(
        "input-field rounded-xl w-[90%] p-3 cursor-text flex items-center gap-3 shadow-sm",
        className
      )}
    >
      <img src={SearchImg.src} className="w-[22px] opacity-50 shrink-0" />

      {tags.map((tag, tagInd) => (
        <div
          key={tagInd}
          className="tag-pill p-1.5 px-2.5 flex gap-1.5 items-center shrink-0"
        >
          <p className="p-0 m-0 text-[13px]">{tag}</p>
          <img
            src={DeleteSvg.src}
            alt=""
            className="w-[14px] opacity-50 hover:opacity-100 hover:scale-110 duration-150"
            onClick={() => handleDeleteTag(tagInd)}
          />
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск или #тег..."
        className="text-[15px] outline-0 flex-1 min-w-0 bg-transparent placeholder:text-[#b89aad]"
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.code === "Space") {
            const words = search.split(" ").filter((word) => word.length > 0);
            const lastWord = words[words.length - 1];
            if (lastWord && lastWord.startsWith("#")) {
              inputChange(
                [...tags, lastWord.slice(1)],
                search.slice(0, search.length - lastWord.length)
              );
              e.preventDefault();
            }
          } else if (
            e.code === "Backspace" &&
            inputRef.current?.selectionStart === 0
          ) {
            handleDeleteLastTag();
          }
        }}
      />
      <div>
        <img
          src={Filter.src}
          alt=""
          className="w-[26px] h-[26px] opacity-60 hover:opacity-100 cursor-pointer duration-150 hover:scale-105"
          onClick={categoriesModal.toggle}
        />
      </div>
      {isSelected && (
        <div
          onClick={() => clearCategory()}
          className="hover:scale-105 duration-150 w-[28px] h-[28px] rounded-full border border-[#b89aad] flex justify-center items-center cursor-pointer hover:bg-[#f0e8ee]"
        >
          <img src={Cross.src} alt="" className="w-[14px] h-[14px] opacity-60" />
        </div>
      )}

      <CategoriesModal
        show={categoriesModal.isShown}
        onClose={categoriesModal.hide}
      />
    </div>
  );
};

export default PollTagsInput;
