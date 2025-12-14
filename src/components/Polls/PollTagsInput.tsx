import clsx from "clsx";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import SearchImg from "@/assets/images/search.svg";
import DeleteSvg from "@/assets/images/close.svg";
import { useModal } from "@/widgets/Modal/useModal";
import CategoriesModal from "@/widgets/CategoriesModal/CategoriesModal";
import Filter from "@/assets/images/Filter.svg";

interface IPollTagsInputProps {
  tags: string[];
  search: string;
  inputChange: (tags: string[], search: string) => void;
  className?: string;
}

const PollTagsInput: FC<IPollTagsInputProps> = ({
  tags,
  search,
  inputChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const categoriesModal = useModal("categories-modal");

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
        "bg-white border-bold rounded-[10px] w-[90%] p-[10px] cursor-pointer flex items-center gap-[10px]",
        className
      )}
    >
      <img src={SearchImg.src} className="w-[35px]" />

      {tags.map((tag, tagInd) => {
        return (
          <div
            key={tagInd}
            className="text-primary p-[5px] border-thin flex gap-[5px] rounded-[10px] bg-white items-center"
          >
            <p className="p-0 m-0">{tag}</p>
            <img
              src={DeleteSvg.src}
              alt=""
              className="w-[20px] hover:scale-[1.2] duration-100"
              onClick={() => handleDeleteTag(tagInd)}
            />
          </div>
        );
      })}
      <input
        ref={inputRef}
        type="text"
        className="text-[16px] outline-0 flex-1 min-w-0 "
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
          className="w-[30px] h-[30px]"
          onClick={categoriesModal.toggle}
        />
      </div>
      <CategoriesModal
        show={categoriesModal.isShown}
        onClose={categoriesModal.hide}
      />
    </div>
  );
};

export default PollTagsInput;
