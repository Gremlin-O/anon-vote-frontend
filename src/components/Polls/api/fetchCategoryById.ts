import { axiosInstance } from "../../../../api";
import { IPollCategory } from "./models";

interface ICategorySearchItem {
  id: string;
  name: string;
  path: string[];
}

let categoriesCache: Map<string, ICategorySearchItem> | null = null;
let cachePromise: Promise<Map<string, ICategorySearchItem>> | null = null;

const loadCategoriesCache = async () => {
  if (categoriesCache) return categoriesCache;
  if (cachePromise) return cachePromise;

  cachePromise = axiosInstance
    .get<ICategorySearchItem[]>("/categories/search?name=")
    .then(({ data }) => {
      categoriesCache = new Map(data.map((item) => [item.id, item]));
      return categoriesCache;
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
};

export const resolveCategoryById = async (
  categoryId: string,
): Promise<IPollCategory | undefined> => {
  if (!categoryId) return undefined;

  const cache = await loadCategoriesCache();
  const category = cache.get(categoryId);

  if (!category) return undefined;

  return {
    id: category.id,
    name: category.name,
    path: category.path,
  };
};

export const enrichPollCategory = async <T extends { category?: IPollCategory }>(
  poll: T,
  categoryId?: string,
): Promise<T> => {
  if (poll.category?.name) return poll;

  const id = poll.category?.id ?? categoryId;
  if (!id) return poll;

  const resolved = await resolveCategoryById(id);
  if (!resolved) return poll;

  return { ...poll, category: resolved };
};
