import { Dispatch, SetStateAction, useState } from "react";
import {
  createAdminCategory,
  createAdminSubcategory,
  createBooks,
  createVyshyvanky,
  deleteEntity,
  updateEntity,
} from "../../../helper/fetch/adminFetch";
import cn from "classnames";
import "./AddEntity.scss";
import { Loader } from "../../Loader";
import { AdminCategory, AdminSubcategory } from "../../../types/AdminNames";
import { DynamicProduct } from "../../../types/Product";
import { getInitialSizes } from "../../../helper/allSizes";
import { getUrlsFromFiles } from "../../../helper/fileToString";

type Props<T extends AdminCategory | AdminSubcategory | DynamicProduct> = {
  chosenEntityName: string | undefined;
  adminEntities: T[];
  setAdminEntities: Dispatch<SetStateAction<T[]>>;
  selectedAdminEntity?:
    | AdminCategory
    | AdminSubcategory
    | DynamicProduct
    | null;
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  parentId: string;
  setParentId: (parentId: string) => void;
};

export const AddEntity = <
  T extends AdminCategory | AdminSubcategory | DynamicProduct,
>({
  chosenEntityName, //categories | subcategories | vyshyvanky | books
  adminEntities,
  setAdminEntities,
  selectedAdminEntity,
  formOpen,
  setFormOpen,
  parentId,
  setParentId,
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [newCategoryName, setNewCategoryName] = useState(
    selectedAdminEntity && "name" in selectedAdminEntity
      ? selectedAdminEntity?.name
      : ""
  );
  const [newCategoryKey, setNewCategoryKey] = useState(
    selectedAdminEntity && "key" in selectedAdminEntity
      ? selectedAdminEntity?.key
      : ""
  );

  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState(
    selectedAdminEntity && "images" in selectedAdminEntity
      ? selectedAdminEntity?.images
      : []
  );

  const [newTitle, setNewTitle] = useState(
    selectedAdminEntity && "title" in selectedAdminEntity
      ? selectedAdminEntity?.title
      : ""
  );

  const [newCategory, setNewCategory] = useState(
    selectedAdminEntity && "category" in selectedAdminEntity
      ? selectedAdminEntity?.category
      : ""
  );
  const [newSubcategory, setSubcategory] = useState(
    selectedAdminEntity && "subcategory" in selectedAdminEntity
      ? selectedAdminEntity?.subcategory
      : ""
  );

  const [newPrice, setNewPrice] = useState<string>(
    selectedAdminEntity && "price" in selectedAdminEntity
      ? String(selectedAdminEntity?.price)
      : ""
  );
  const [newDescription, setNewDescription] = useState(
    selectedAdminEntity && "description" in selectedAdminEntity
      ? selectedAdminEntity?.description
      : ""
  );
  const [newIsAvailable, setNewIsAvailable] = useState(
    selectedAdminEntity && "isAvailable" in selectedAdminEntity
      ? selectedAdminEntity?.isAvailable
      : 0
  );
  const [newSize, setSize] = useState(
    selectedAdminEntity && "size" in selectedAdminEntity
      ? selectedAdminEntity.size
      : ""
  );
  const [newSizesAvailable, setNewSizesAvailable] = useState<string[]>(
    selectedAdminEntity && "sizesAvailable" in selectedAdminEntity
      ? selectedAdminEntity.sizesAvailable
      : chosenEntityName === "vyshyvanky"
        ? getInitialSizes(+parentId)
        : []
  );

  const [newGenre, setNewGenre] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subcategoryIds = [1, 2, 3, 4, 5];
  const subcategoryNames = [
    "Жінкам",
    "Чоловікам",
    "Хлопчикам",
    "Дівчатам",
    "Книги",
  ];

  //for images only

  const MAX_IMG_FILES_PROD = 5;
  const MAX_IMG_FILES_CAT = 1;

  const handleChangeImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    maxImgFiles: number
  ) => {
    console.log(event.target.files);
    if (event.target.files) {
      let selectedFiles = Array.from(event.target.files).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/jpg"
      );
      console.log("selectedFiles", selectedFiles);

      setNewImageFiles((prev) => {
        const remainingSlots = maxImgFiles - newImageFiles.length;
        console.log("remailing slots", newImageFiles.length, remainingSlots);

        if (remainingSlots <= 0) {
          alert(`Можна завантажити до ${maxImgFiles} файлів`);
          return prev;
        }

        if (selectedFiles.length > remainingSlots) {
          selectedFiles = selectedFiles.splice(0, remainingSlots);
          alert(`Можна завантадити до ${maxImgFiles} файлів`);
        }

        const newFiles = [...prev, ...selectedFiles];
        console.log("newFiles", newFiles);

        getUrlsFromFiles(newFiles, setNewImagePreviewUrls, setError);
        return newFiles;
      });

      console.log("mewImageFiles", newImageFiles);
    } else {
      return;
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  const removeImage = (ind: number) => {
    if (window.confirm(`Ви впевнені, що бажаєте видалити картинку`)) {
      setNewImageFiles(newImageFiles.filter((_, i) => i !== ind));
    } else {
      return;
    }
  };

  const addEntity = async () => {
    try {
      let newEntity:
        | Omit<AdminCategory, "id">
        | Omit<AdminSubcategory, "id">
        | Omit<DynamicProduct, "id">;
      console.log("newImagePreviewUrls", newImagePreviewUrls);


      switch (chosenEntityName) {
        case "categories":
          newEntity = await createAdminCategory({
            name: newCategoryName,
            key: newCategoryKey,
          });
          break;

        case "subcategories":
          newEntity = await createAdminSubcategory(
            newCategoryName,
            newCategoryKey,
            +parentId,
            newImageFiles[0]
          );
          break;
        case "vyshyvanky":
          // const vyshyvankyData = {
          //   categoryId: +newCategory,
          //   subcategoryId: +newSubcategory,
          //   title: newTitle,
          //   price: +newPrice,
          //   description: newDescription,
          //   isAvailable: newIsAvailable,
          //   size: newSize,
          //   sizesAvailable: newSizesAvailable,
          // };

          newEntity = await createVyshyvanky(
            +newCategory,
            +newSubcategory,
            newTitle,
            +newPrice,
            newDescription,
            +newIsAvailable,
            newSize,
            newSizesAvailable,
            newImageFiles
          );
          break;

        case "books":
          // const booksData = {
          //   categoryId: +newCategory,
          //   subcategoryId: +newSubcategory,
          //   title: newTitle,
          //   price: +newPrice,
          //   genre: newGenre,
          //   description: newDescription,
          //   isAvailable: newIsAvailable,
          // };

          // formData.append("data", JSON.stringify(booksData));
          // newImageFiles.forEach((file) => formData.append("file", file));

          newEntity = await createBooks(
            +newCategory,
            +newSubcategory,
            newTitle,
            +newPrice,
            newGenre,
            newDescription,
            newIsAvailable,
            newImageFiles
          );
          break;
        default:
          throw new Error(`Unknown entity type: ${chosenEntityName}`);
      }
      setAdminEntities((prev) => [...prev, newEntity as T]);
    } catch (error) {
      console.error(`Error adding ${chosenEntityName}:`, error);
    }
  };

  const deleteCurrentEntity = async (type: string, id: number) => {
    try {
      if (
        window.confirm(`Ви впевнені, що бажаєте видалити товар чи категорію`)
      ) {
        await deleteEntity(type, id);

        setAdminEntities((currentEntities) =>
          (currentEntities as T[]).filter((entity) => entity.id !== id)
        );
      } else {
        return;
      }
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  const editSelectedEntity = (type: string) => {
    const edditedEntity = {
      id: selectedAdminEntity?.id,
      ...(chosenEntityName === "categories" && {
        name: newCategoryName,
        key: newCategoryKey,
      }),
      ...(chosenEntityName === "subcategories" && {
        name: newCategoryName,
        key: newCategoryKey,
        categoryId: parentId,
        image: newImagePreviewUrls[0],
      }),
      ...(chosenEntityName === "vyshyvanky" && {
        categoryId: +newCategory,
        subcategoryId: +newSubcategory,
        title: newTitle,
        images: newImagePreviewUrls,
        price: +newPrice,
        description: newDescription,
        isAvailable: newIsAvailable,
      }),
      ...(chosenEntityName === "books" && {
        categoryId: +newCategory,
        subcategoryId: +newSubcategory,
        title: newTitle,
        price: +newPrice,
        images: newImagePreviewUrls,
        genre: newGenre,
        description: newDescription,
        isAvailable: newIsAvailable,
      }),
    } as T;

    return updateEntity(type, edditedEntity).then((editedEntity) =>
      setAdminEntities((currents) =>
        currents.map((entity) =>
          entity.id === editedEntity.id ? edditedEntity : entity
        )
      )
    );
  };

  const reset = () => {
    setNewCategoryName("");
    setNewCategoryKey("");
    setNewImageFiles([]);
    setNewTitle("");
    setNewCategory("");
    setSubcategory("");
    setNewPrice("");
    setNewDescription("");
    setNewIsAvailable(0);
    setSize("");
    setNewSizesAvailable([]);
    setNewGenre("");

    setParentId("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedAdminEntity) {
        await editSelectedEntity(chosenEntityName as string);
      } else {
        await addEntity();
      }
      reset();
      setFormOpen(false);
    } catch (error) {
      console.error(`Failed to submit ${chosenEntityName}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("selected Admin Entity", selectedAdminEntity);
  console.log("chosenEntityName", chosenEntityName);
  console.log("form open", formOpen);

  return (
    <div className="entity">
      <form className="entity__form" onSubmit={handleSubmit} onReset={reset}>
        {chosenEntityName === "categories" ||
        chosenEntityName === "subcategories" ? (
          //#region CATEGORIES and SUBCATEGORIES inputs
          <>
            <label htmlFor="admin-category-name" className="entity__label">
              {chosenEntityName === "categories"
                ? "Category name"
                : "Subcategory name"}
              <input
                type="text"
                id="admin-category-name"
                className="entity__input"
                value={newCategoryName}
                onChange={handleChange(setNewCategoryName)}
                placeholder="Category Name"
              />
            </label>

            <label htmlFor="admin-category-key" className="entity__label">
              {chosenEntityName === "categories"
                ? "Category key"
                : "Subcategory key"}
              <input
                type="text"
                className="entity__input"
                value={newCategoryKey}
                onChange={handleChange(setNewCategoryKey)}
                placeholder="Category Key"
              />
            </label>

            {chosenEntityName === "subcategories" && (
              <>
                <label
                  htmlFor="admin-category-category"
                  className="entity__label"
                >
                  CategoryId
                  <input
                    type="text"
                    className="entity__input"
                    value={String(parentId)}
                    onChange={(e) => setParentId(e.target.value)}
                    placeholder="Category"
                  />
                </label>

                <label
                  htmlFor="admin-category-category"
                  className="entity__label"
                >
                  Зображення товару
                  <input
                    type="file"
                    className="entity__input"
                    accept="image/jpeg, image/jpg"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeImages(e, MAX_IMG_FILES_CAT)
                    }
                    placeholder="Product's images"
                  />
                  <img
                    src={`${newImagePreviewUrls[0]}`} //{process.env.PUBLIC_URL}/
                    alt={`Uploaded one`}
                    width="100"
                  />
                  <button
                    onClick={() => removeImage(0)}
                    className="form__close"
                  >
                    видалити
                  </button>
                </label>
              </>
            )}
          </>
        ) : (
          //#endregion
          //#region PRODUCTS inputs
          <>
            <label htmlFor="admin-category-category" className="entity__label">
              Назва товару
              <input
                type="text"
                className="entity__input"
                value={newTitle}
                onChange={handleChange(setNewTitle)}
                placeholder="Product's title"
              />
            </label>

            <label htmlFor="admin-category-category" className="entity__label">
              Категорія товару
              <input
                type="text"
                className="entity__input"
                value={newCategory}
                onChange={handleChange(setNewCategory)}
                placeholder="Product's Category"
              />
            </label>

            <label htmlFor="admin-category-category" className="entity__label">
              Підкатегорія товару
              <input
                type="text"
                className="entity__input"
                value={newSubcategory}
                onChange={handleChange(setSubcategory)}
                placeholder="Product's Subcategory"
              />
            </label>

            <label htmlFor="admin-category-category" className="entity__label">
              Зображення товару
              <input
                type="file"
                className="entity__input"
                accept="image/jpeg, image/jpg"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeImages(e, MAX_IMG_FILES_PROD)
                }
                placeholder="Product's images"
              />
              <ul>
                {newImageFiles.map((image, index) => (
                  <li key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${image}`}
                      alt={`Uploaded ${index}`}
                      width="100"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="form__close"
                    >
                      видалити
                    </button>
                  </li>
                ))}
              </ul>
            </label>

            <label htmlFor="admin-category-category" className="entity__label">
              Ціна товару
              <input
                type="number"
                min="0"
                className="entity__input"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Product's price"
              />
            </label>

            <label htmlFor="admin-category-category" className="entity__label">
              Опис товару
              <textarea
                className="entity__input entity__input--textarea"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Product's description"
                rows={10}
              />
            </label>

            <div className="entity__group entity__group--checkbox">
              <label
                className={cn("entity__label entity__label--checkbox", {
                  "entity__label--checkbox-checked": newIsAvailable > 0,
                })}
              >
                <input
                  type="number"
                  className={cn("entity__input entity__input--checkbox", {
                    "entity__input--checkbox-checked": newIsAvailable > 0,
                  })}
                  checked={newIsAvailable > 0}
                  onChange={(e) => setNewIsAvailable(+e.target.value)}
                />
                {newIsAvailable > 0 ? "В наявності" : "Під замовлення"}
              </label>
            </div>

            <div className="entity__group entity__group--checkbox">
              {subcategoryIds.map((id, index) => (
                <label
                  key={id}
                  className={cn("entity__label entity__label--checkbox", {
                    "entity__label--checkbox-checked": +parentId === id,
                  })}
                >
                  <input
                    type="radio"
                    className={cn("entity__input entity__input--checkbox", {
                      "entity__input--checkbox-checked": +parentId === id,
                    })}
                    name="subcategory"
                    checked={+parentId === id}
                    onChange={() => {
                      console.log("Clicked on:", id);
                      setParentId(String(id));
                    }}
                  />
                  {subcategoryNames[index]}
                </label>
              ))}
            </div>

            {/* If vyshyvanky */}
            {(parentId === "1" ||
              parentId === "2" ||
              parentId === "3" ||
              parentId === "4") && (
              <div className={cn("dropdown__input")}>
                <label
                  htmlFor="admin-category-category"
                  className="entity__label"
                >
                  Розмір товару
                  <select
                    value={newSize}
                    onChange={(e) => setSize(e.target.value)}
                    className="entity__input"
                  >
                    {/* If adding a new product, show "Оберіть розмір" */}
                    {selectedAdminEntity === null && (
                      <>
                        <option className="dropdown__option" disabled value="">
                          Оберіть розмір
                        </option>
                        {getInitialSizes(+parentId)?.map((size) => (
                          <option
                            key={size}
                            value={size}
                            className="dropdown__option"
                          >
                            {size}
                          </option>
                        ))}
                      </>
                    )}

                    {selectedAdminEntity && "size" in selectedAdminEntity && (
                      <>
                        {/* If updating a product, pre-select its size */}
                        <option
                          className="dropdown__option"
                          disabled
                          value={selectedAdminEntity?.size}
                        >
                          {selectedAdminEntity?.size}
                        </option>
                        {getInitialSizes(
                          selectedAdminEntity.subcategoryId
                        )?.map((size) => (
                          <option
                            key={size}
                            value={size}
                            className="dropdown__option"
                          >
                            {size}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </label>
              </div>
            )}

            {parentId === "5" && (
              <label
                htmlFor="admin-category-category"
                className="entity__label"
              >
                Жанр книги
                <input
                  type="text"
                  className="entity__input"
                  value={newGenre}
                  onChange={handleChange(setNewGenre)}
                  placeholder="Books's genre"
                />
              </label>
            )}
          </>
          //#endregion
        )}

        <div className="categories__buttons">
          <button
            className="categories__button admin__button admin__button--close"
            type="submit"
          >
            {!isSubmitting && selectedAdminEntity ? (
              "Змінити"
            ) : !isSubmitting && selectedAdminEntity === null ? (
              "Додати"
            ) : (
              <Loader />
            )}
          </button>

          <button
            className="categories__button admin__button admin__button--close"
            type="reset"
          >
            Очистити
          </button>

          <button
            className="categories__button admin__button admin__button--close"
            type="button"
            onClick={() => {
              reset();
              setFormOpen(false);
            }}
          >
            {`Скасувати ${selectedAdminEntity === null ? "створення" : "внесення змін"}`}
          </button>
        </div>
      </form>

      {selectedAdminEntity && chosenEntityName && (
        <button
          type="reset"
          className="sidebar__submit"
          onClick={() =>
            deleteCurrentEntity(chosenEntityName, selectedAdminEntity?.id)
          }
        >
          Видалити товар
        </button>
      )}
    </div>
  );
};
