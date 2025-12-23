"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
// import Option from './OptionList';
import OptionList from "./OptionList";
import { IOption } from "@/widgets/CategoriesModal/api/useCategoriese";
import { useMobile } from "@/shared/utils/useMobile";
import Arrow from "@/assets/images/arrow.svg";
import { div, p } from "motion/react-client";
import { useCategoriesStore } from "@/store/categoriesStore";

interface IOptionsProps {
  options: IOption[];
  path: number[];
  onChange: (path: number[], isOpened: boolean) => void;
}

// const getMaxDepth = (options: IOption[]): number => {
// 	const getMaxDepthRec = (option: IOption): number => {
// 		if (!option.children) return 1;
// 		return Math.max(...option.children.map((ch) => getMaxDepthRec(ch))) + 1;
// 	};

// 	return Math.max(...options.map((opt) => getMaxDepthRec(opt)));
// };

const Options: FC<IOptionsProps> = ({ options, path, onChange }) => {
  const isMobile = useMobile();
  const selectOption = (level: IOption[], levelInd: number, ind: number) => {
    // console.log("level's children", level[ind].children?.length);

    const needToClose =
      path.length - 1 > levelInd && path[levelInd + 1] === ind; // для пк
    if (needToClose) {
      onChange(path.slice(0, levelInd + 1), false);
    } else {
      if (path.length > currentLevels.length) {
        onChange(path.slice(0, levelInd).concat([ind]), true);
      } else {
        onChange(path.slice(0, levelInd + 1).concat([ind]), true);
      }
    }
  };
  const { selectedPath } = useCategoriesStore();

  const [mobileSelectedItem, setMobileSelectedItem] = useState<number | null>(
    null
  );

  const getLevels = useCallback(() => {
    const levels: IOption[][] = [options];

    for (let i = 1; i < path.length; i++) {
      const prevLevel = levels[i - 1];
      const newLevel = prevLevel[path[i]]?.children;
      if (newLevel && newLevel.length) {
        levels.push(newLevel);
      }
    }

    return levels;
  }, [path, options]);

  const currentLevels = useMemo(() => getLevels(), [getLevels]);

  useEffect(() => {
    if (isMobile) {
      if (path.length > currentLevels.length) {
        setMobileSelectedItem(path[path.length - 1]);
      } else {
        setMobileSelectedItem(null);
      }
    }
  }, [path, isMobile, currentLevels, setMobileSelectedItem]);

  const goBack = () => {
    if (path.length > 1) {
      onChange(path.slice(0, path.length - 1), false);
    }
  };

  console.log("selected path", selectedPath);
  console.log("levels", currentLevels);

  return (
    <div className="flex flex-col overflow-hidden ">
      {isMobile && (
        <>
          <div className="flex">
            {/* {selectedPath.slice(1).map((el, ind) => {
              return (
  
              );
            })} */}

            <div>
              {currentLevels
                .slice(
                  0,
                  path.length > currentLevels.length
                    ? currentLevels.length
                    : currentLevels.length - 1
                )
                .map((level, i) => {
                  return (
                    <span
                      className="p-2 border border-b-slate-100 rounded-md"
                      key={level[selectedPath[i + 1]].id}
                    >
                      {level[selectedPath[i + 1]].name}
                    </span>
                  );
                })}
            </div>
          </div>
          <div
            className="flex cursor-pointer flex-start w-fit m-2 group"
            onClick={goBack}
          >
            <img
              src={Arrow.src}
              alt=""
              className="w-[20px] text-gray-400 rotate-180 group-hover:scale-[1.1] duration-100"
            />
            <p className="text-primary">Назад</p>
          </div>
        </>
      )}
      <div className="flex gap-[10px] flex-col items-center mt-[30px] md:mt-0 md:min-h-0">
        {!isMobile &&
          currentLevels.map((level, levelInd) => {
            if (!level.length) return;
            return (
              <OptionList
                selected={path[levelInd + 1] ?? null}
                key={levelInd + JSON.stringify(level)}
                options={level}
                onClick={(ind) => selectOption(level, levelInd, ind)}
              />
            );
          })}

        {isMobile && currentLevels.length > 0 && (
          <OptionList
            selected={mobileSelectedItem}
            options={currentLevels[currentLevels.length - 1]}
            onClick={(ind) =>
              selectOption(
                currentLevels[currentLevels.length - 1],
                path.length - 1,
                ind
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Options;
