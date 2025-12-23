import Button from "@/components/Button/Button";
import { useCategories } from "@/widgets/CategoriesModal/api/useCategoriese";
import Modal from "@/widgets/Modal/Modal";
import clsx from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Tree } from "react-arborist";
import type { NodeApi } from "react-arborist";
import Arrow from "@/assets/images/arrow.svg";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

interface ICreateCategoryProps {
  show: boolean;
  onClose: () => void;
  onCategoryCreate: (categoryName: string, parentId: string) => void;
}

const CreateCategoryModal: FC<ICreateCategoryProps> = ({
  show,
  onClose,
  onCategoryCreate,
}) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const { categories, loadCategories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const treeData = useMemo(() => {
    const transformData = (nodes: TreeNode[]): any[] => {
      return nodes.map((node) => ({
        id: node.id,
        name: node.name,
        children: node.children ? transformData(node.children) : undefined,
      }));
    };

    return transformData(categories);
  }, [categories]);

  const handleToggle = useCallback(
    async (node: NodeApi<any>) => {
      if (!node.children && !node.data.children) {
        await loadCategories(node.id);
      }
    },
    [loadCategories]
  );

  const handlePlusClick = useCallback(
    (nodeId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setSelectedCategoryId((prev) => (prev === nodeId ? null : nodeId));
    },
    []
  );

  const handleConfirm = () => {
    if (selectedCategoryId && selectedCategoryName !== "") {
      onCategoryCreate(selectedCategoryName, selectedCategoryId);
      setSelectedCategoryId(null);
      setSelectedCategoryName("");
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedCategoryId(null);

    onClose();
  };

  // Компонент для рендера узла дерева
  const Node = ({ node, style, dragHandle }: any) => {
    const isSelected = selectedCategoryId === node.id;

    return (
      <div
        style={style}
        ref={dragHandle}
        className="node"
        onClick={() => node.toggle()}
      >
        <div
          className={clsx(
            "flex items-center justify-between cursor-pointer h-full pr-2.5 transition-colors duration-200",
            "border-b border-gray-100 last:border-b-0", // Отступы между категориями
            {
              "bg-green-50": isSelected,
              "bg-transparent": !isSelected,
            }
          )}
          style={{
            paddingLeft: node.level * 20,
          }}
        >
          <div className="flex items-center min-h-10">
            {" "}
            {/* Фиксированная высота для отступов */}
            {node.isInternal ? (
              <img
                src={Arrow.src}
                alt=""
                className={clsx("ml-2 mr-2 w-[10px] -rotate-90 duration-100", {
                  "rotate-90": node.isOpen,
                })}
              />
            ) : (
              <span className="mr-4">•</span>
            )}
            <span className="text-sm md:text-base text-primary">
              {node.data.name}
            </span>
          </div>

          <Button
            onClick={(e) => handlePlusClick(node.id, e)}
            className={clsx(
              "flex items-center text-[#7b1258] justify-center w-6 h-6 rounded-full transition-all duration-200 text-xs font-bold",
              "border border-[#7b1258]",
              {
                "bg-green-500 text-white border-green-500": isSelected,
                "bg-gray-100 hover:bg-gray-200": !isSelected,
              }
            )}
            text={isSelected ? "✓" : "+"}
          />
        </div>
      </div>
    );
  };

  return (
    <Modal
      show={show}
      onClose={handleCancel}
      className="w-[80%] md:w-4/5 lg:w-2/3 mx-4 max-h-[90vh] overflow-y-auto" // Добавлен скролл
    >
      <div className="p-4 md:p-5 lg:p-6 w-full">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] mb-4 md:mb-5 text-primary font-bold">
          Создайте свою категорию
        </h1>

        <h2 className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 text-primary font-semibold">
          Выберите место для встраивания
        </h2>

        <div className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
          Нажмите "+" рядом с категорией, чтобы встроиться в неё
        </div>

        {/* Увеличиваем высоту блока категорий */}
        <div className=" w-full border border-gray-200 rounded-lg overflow-hidden">
          <Tree
            data={treeData}
            height={330}
            width="100%"
            onToggle={() => handleToggle}
            openByDefault={false}
            rowHeight={40}
          >
            {Node}
          </Tree>
        </div>

        {/* Статус выбора и кнопки */}
        <div className="flex flex-col justify-between items-start lg:items-center gap-4 mt-4 md:mt-5">
          <div
            className={clsx(
              "w-full lg:w-auto px-3 py-2 md:px-4 md:py-3 rounded-lg border-2 text-sm md:text-base transition-colors",
              {
                "bg-green-50 border-green-200 text-green-800":
                  selectedCategoryId,
                "bg-yellow-50 border-primary text-primary": !selectedCategoryId,
              }
            )}
          >
            {selectedCategoryId ? (
              <p className="font-medium">
                ✅ Выбрана категория для встраивания
              </p>
            ) : (
              <p className="font-medium">ℹ️ Выберите категорию, нажав на "+"</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Введите название категории"
              className="border-medium bg-white text-primary rounded-[5px] p-[10px] text-[20px] outline-0 w-full"
              onChange={(e) => {
                setSelectedCategoryName(e.target.value);
              }}
            />
          </div>

          {/* Кнопки действий */}
          <div className="flex md:flex-col gap-2 md:gap-3 w-full lg:w-auto">
            <Button
              onClick={handleCancel}
              text="Отмена"
              className="w-[200px] sm:w-auto text-center"
            />
            <Button
              onClick={handleConfirm}
              className={clsx(
                "w-[200px] sm:w-auto text-center transition-opacity",
                {
                  inactive: !selectedCategoryId || selectedCategoryName == "",
                  "hover:opacity-90": selectedCategoryId,
                }
              )}
              text="Выбрать"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
