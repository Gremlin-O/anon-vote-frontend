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
    <div className="flex shrink-0 gap-2 input-field-contrast p-2.5 text-[15px] mb-5 items-center flex-wrap max-w-full overflow-x-auto md:mb-3 md:p-2">
      {tags.map((tag, tagInd) => (
        <div key={tagInd} className="tag-pill p-1.5 px-2.5 text-[13px]">
          {tag}
        </div>
      ))}
      <input
        type="text"
        placeholder={tags.length === 0 ? "Введите тэги через пробел" : ""}
        className="text-[16px] outline-0 flex-1 min-w-0 text-primary placeholder:text-[#8a6278]"
        value={tagsInputValue}
        onChange={(e) => setTagsInputValue(e.currentTarget.value)}
        onBlur={() => buildTags()}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && tagsInputValue === "") {
            tagsChange(tags.slice(0, tags.length - 1));
          } else if (e.key === " " || e.key === "Enter") {
            const builtSomething = buildTags();
            if (builtSomething) e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default TagsInput;
