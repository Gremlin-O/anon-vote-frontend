import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { axiosInstance } from "../../../../api";
import { useCategoriesStore } from "@/store/categoriesStore";

export interface IOption {
  name: string;
  children?: IOption[];
  id: string;
}

const Depth = 2;

const fillCategoryById = (
  id: string,
  options: IOption[],
  fillCategories: IOption[],
) => {
  const fn = (option: IOption): IOption | undefined => {
    if (option.id === id) {
      return option;
    } else {
      return option.children?.map(fn).filter(Boolean)[0];
    }
  };

  const foundCategory = options.map(fn).filter(Boolean)[0];
  if (foundCategory) {
    foundCategory.children = fillCategories;
  }
};

export const useCategories = () => {
  const [categories, setCategories] = useState<IOption[]>();
  const loadedNodes = useRef<Array<IOption>>([]);

  const loadCategories = useCallback(
    async (parentCategoryId?: string) => {
      if (
        parentCategoryId &&
        loadedNodes.current.some(
          (cat) => cat.id == parentCategoryId && cat.children?.length,
        )
      ) {
        return;
      }

      try {
        const { data: newCategories } = await axiosInstance.get<IOption[]>(
          `/categories/${parentCategoryId ?? ""}?depth=${Depth}`,
        );
        setCategories((prev) => {
          if (parentCategoryId && prev) {
            const prevCopy = structuredClone(prev);
            fillCategoryById(parentCategoryId, prevCopy, newCategories);
            return prevCopy;
          } else {
            return newCategories;
          }
        });
        newCategories.forEach((cat) => {
          loadedNodes.current.push(cat);
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [setCategories],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { categories: categories ?? [], loadCategories };
};
