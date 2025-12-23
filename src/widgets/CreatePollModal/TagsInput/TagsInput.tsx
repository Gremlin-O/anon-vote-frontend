import React, { FC, useState } from "react";

interface ITagsInputProps {
  tags: string[];
  tagsChange: (tags: string[]) => void;
}

const TagsInput: FC<ITagsInputProps> = ({ tags, tagsChange }) => {
  const [tagsInputValue, setTagsInputValue] = useState<string>("");

  const buildTags = () => {
    const newTags = tagsInputValue.split(" ").filter((tag) => tag.length > 0);
    if (newTags.length > 0) {
      tagsChange([...tags, ...newTags]);
      setTagsInputValue("");
      return true;
    }
    return false;
  };

  return (
    <div className="flex shrink-0 gap-[5px] border-medium bg-white text-primary rounded-[5px] p-[8px] text-[16px] outline-0 mb-[20px] items-center flex-wrap max-w-full overflow-x-auto md:mb-[10px] md:p-[5px]">
      {tags.map((tag, tagInd) => {
        return (
          <div
            key={tagInd}
            className="text-primary p-[5	px] border-thin border-amber-500 rounded-[10px] bg-white"
          >
            {tag}
          </div>
        );
      })}
      <input
        type="text"
        placeholder={tags.length === 0 ? "Введите тэги через пробел" : ""}
        className="text-[16px] outline-0 flex-1 min-w-0"
        value={tagsInputValue}
        onChange={(e) => setTagsInputValue(e.currentTarget.value)}
        onBlur={() => {
          buildTags();
        }}
        onKeyDown={(e) => {
          console.log(e);
          if (e.key === "Backspace" && tagsInputValue === "") {
            tagsChange(tags.slice(0, tags.length - 1));
          } else if (e.key === " " || e.key === "Enter") {
            const builtSomething = buildTags();
            if (builtSomething) {
              e.preventDefault();
            }
          }
        }}
      />
    </div>
  );
};

export default TagsInput;
