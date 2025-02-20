import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  createAdminCategory,
  createAdminSubcategory,
  createBook,
  createVyshyvanka,
  deleteProduct,
  updateEntity,
} from "../../../helper/fetch";
import cn from "classnames";
import { Loader } from "../../Loader";
import { AdminCategory, AdminSubcategory } from "../../../types/AdminNames";
import { Vyshyvanka } from "../../../types/Vyshyvanka";
import { Book } from "../../../types/Book";
import { DynamicProduct } from "../../../types/Product";

//function for trial check how photos uploaded
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const adultsSizesAvailable = ["XS", "S", "M", "L", "XL", "XXL"];
const kidsSizesAvailable = [
  "92",
  "98",
  "104",
  "110",
  "116",
  "122",
  "128",
  "134",
  "140",
  "146",
  "152",
  "158",
  "164",
];

const getInitialSizes = (subcategory: string) => {
  if (!subcategory) {
    return;
  }
  if (subcategory === "women" || subcategory === "men") {
    return adultsSizesAvailable;
  } else if (subcategory === "girls" || subcategory === "boys") {
    return kidsSizesAvailable;
  } else return [];
};

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
  selectedSubcategForProdCreating: AdminSubcategory | null;
};

export const AddEntity = <
  T extends AdminCategory | AdminSubcategory | DynamicProduct,
>({
  chosenEntityName, //category | subcategory | vyshyvanky | books
  adminEntities,
  setAdminEntities,
  selectedAdminEntity,
  formOpen,
  setFormOpen,
  selectedSubcategForProdCreating,
}: Props<T>) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryKey, setNewCategoryKey] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newImage, setNewImage] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const [newTitle, setNewTitle] = useState(
    selectedAdminEntity && "title" in selectedAdminEntity
      ? selectedAdminEntity?.title
      : ""
  );
  const [newProductId, setNewProductId] = useState(
    selectedAdminEntity?.id || ""
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
  const [newImages, setNewImages] = useState<string[]>(
    selectedAdminEntity && "images" in selectedAdminEntity
      ? selectedAdminEntity?.images
      : []
  );
  const [newPrice, setNewPrice] = useState(
    selectedAdminEntity && "price" in selectedAdminEntity
      ? selectedAdminEntity?.price
      : 0
  );
  const [newDescription, setNewDescription] = useState(
    selectedAdminEntity && "description" in selectedAdminEntity
      ? selectedAdminEntity?.description
      : ""
  );
  const [newIsAvailable, setNewIsAvailable] = useState(
    selectedAdminEntity && "isAvailable" in selectedAdminEntity
      ? selectedAdminEntity?.isAvailable
      : false
  );
  const [newSize, setSize] = useState(
    selectedAdminEntity && "size" in selectedAdminEntity
      ? selectedAdminEntity.size
      : ""
  );
  const [newSizesAvailable, setNewSizesAvailable] = useState<string[]>(
    selectedAdminEntity && "sizesAvailable" in selectedAdminEntity
      ? selectedAdminEntity.sizesAvailable
      : []
  );

  const [newGenre, setNewGenre] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //for images only
  const MAX_IMG_FILES = 5;
  const handleChangeImages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      let selectedFiles = Array.from(event.target.files).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/jpg"
      );

      const remainingSlots = MAX_IMG_FILES - newImages.length;
      if (remainingSlots <= 0) {
        alert(`Можна завантадити до ${MAX_IMG_FILES} файлів`);
        return;
      }

      if (selectedFiles.length > remainingSlots) {
        selectedFiles = selectedFiles.splice(0, remainingSlots);
        alert(`Можна завантадити до ${MAX_IMG_FILES} файлів`);
      }

      const base64Images = await Promise.all(
        selectedFiles.map((file) => convertToBase64(file))
      );

      setNewImages((prevImages) => [...prevImages, ...base64Images]);
    } else {
      return;
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  const removeImage = (ind: number) => {
    setNewImages(newImages.filter((_, i) => i !== ind));
  };

  const addEntity = async () => {
    try {
      let newEntity: AdminCategory | AdminSubcategory | DynamicProduct;

      switch (chosenEntityName) {
        case "category":
          newEntity = await createAdminCategory({
            name: newCategoryName,
            key: newCategoryKey,
            id: newCategoryId,
          });
          break;
        case "subcategory":
          newEntity = await createAdminSubcategory({
            name: newCategoryName,
            key: newCategoryKey,
            id: newCategoryId,
            category: parentCategory,
            image: newImage,
          });
          break;
        case "vyshyvanky":
          newEntity = await createVyshyvanka({
            id: newProductId,
            category: newCategory,
            subcategory: newSubcategory,
            title: newTitle,
            images: newImages,
            price: newPrice,
            description: newDescription,
            isAvailable: newIsAvailable,
            size: newSize,
            sizesAvailable: newSizesAvailable,
          });
          break;

        case "books":
          newEntity = await createBook({
            id: newProductId,
            category: newCategory,
            subcategory: newSubcategory,
            title: newTitle,
            price: newPrice,
            images: newImages,
            genre: newGenre,
            description: newDescription,
            isAvailable: newIsAvailable,
          });
          break;
        default:
          throw new Error(`Unknown entity type: ${chosenEntityName}`);
      }
      setAdminEntities((prev) => [...prev, newEntity as T]);
    } catch (error) {
      console.error(`Error adding ${chosenEntityName}:`, error);
    }
  };

  const deleteCurrentEntity = async (id: string) => {
    try {
      if (window.confirm(`Ви впевнені, що бажаєте видалити товар чи категорію`)) {
        await deleteProduct(id);

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
      ...(chosenEntityName === "category" && {
        name: newCategoryName,
        key: newCategoryKey,
        id: newCategoryId,
      }),
      ...(chosenEntityName === "subcategory" && {
        name: newCategoryName,
        key: newCategoryKey,
        id: newCategoryId,
        category: parentCategory,
      }),
      ...(chosenEntityName === "vyshyvanky" && {
        id: newProductId,
        category: newCategory,
        subcategory: newSubcategory,
        title: newTitle,
        images: newImages,
        price: newPrice,
        description: newDescription,
        isAvailable: newIsAvailable,
      }),
      ...(chosenEntityName === "books" && {
        id: newProductId,
        category: newCategory,
        subcategory: newSubcategory,
        title: newTitle,
        price: newPrice,
        images: newImages,
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
    setNewCategoryId("");
    setParentCategory("");
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

      setFormOpen(false);
      reset();
    } catch (error) {
      console.error(`Failed to submit ${chosenEntityName}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("selected Admin Entity", selectedAdminEntity);
  console.log("isAvailable", newIsAvailable);

  return (
    <div className="entity">
      {formOpen && (
        <>
          <form
            className="categories__form"
            onSubmit={handleSubmit}
            onReset={reset}
          >
            {chosenEntityName === "category" ||
            chosenEntityName === "subcategory" ? (
              //#region CATEGORIES and SUBCATEGORIES inputs
              <>
                <label
                  htmlFor="admin-category-name"
                  className="categories__label"
                >
                  {chosenEntityName === "category"
                    ? "Category name"
                    : "Subcategory name"}
                  <input
                    type="text"
                    id="admin-category-name"
                    className="categories__input"
                    value={newCategoryName}
                    onChange={handleChange(setNewCategoryName)}
                    placeholder="Category Name"
                  />
                </label>

                <label
                  htmlFor="admin-category-key"
                  className="categories__label"
                >
                  {chosenEntityName === "category"
                    ? "Category key"
                    : "Subcategory key"}
                  <input
                    type="text"
                    className="categories__input"
                    value={newCategoryKey}
                    onChange={handleChange(setNewCategoryKey)}
                    placeholder="Category Key"
                  />
                </label>

                <label
                  htmlFor="admin-category-id"
                  className="categories__label"
                >
                  {chosenEntityName === "category"
                    ? "Category id"
                    : "Subcategory id"}
                  <input
                    type="text"
                    className="categories__input"
                    value={newCategoryId}
                    onChange={handleChange(setNewCategoryId)}
                    placeholder="Category Id"
                  />
                </label>

                {chosenEntityName === "subcategory" && (
                  <label
                    htmlFor="admin-category-category"
                    className="categories__label"
                  >
                    Category
                    <input
                      type="text"
                      className="categories__input"
                      value={parentCategory}
                      onChange={handleChange(setParentCategory)}
                      placeholder="Category"
                    />
                  </label>
                )}
              </>
            ) : (
              //#endregion
              //#region PRODUCTS inputs
              <>
                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  Назва товару
                  <input
                    type="text"
                    className="categories__input"
                    value={newTitle}
                    onChange={handleChange(setNewTitle)}
                    placeholder="Product's title"
                  />
                </label>

                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  ID товару
                  <input
                    type="text"
                    className="categories__input"
                    value={newProductId}
                    onChange={handleChange(setNewProductId)}
                    placeholder="Product's id"
                  />
                </label>

                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  Категорія товару
                  <input
                    type="text"
                    className="categories__input"
                    value={newCategory}
                    onChange={handleChange(setNewCategory)}
                    placeholder="Product's Category"
                  />
                </label>

                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  Підкатегорія товару
                  <input
                    type="text"
                    className="categories__input"
                    value={newSubcategory}
                    onChange={handleChange(setSubcategory)}
                    placeholder="Product's Subcategory"
                  />
                </label>

                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  Зображення товару
                  <input
                    type="file"
                    className="categories__input"
                    accept="image/jpeg, image/jpg"
                    multiple
                    onChange={handleChangeImages}
                    placeholder="Product's images"
                  />
                  <ul>
                    {newImages.map((image, index) => (
                      <li key={index}>
                        <img
                          src={image}
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

                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  Ціна товару
                  <input
                    type="text"
                    className="categories__input"
                    value={newPrice}
                    onChange={() => setNewPrice(newPrice)}
                    placeholder="Product's price"
                  />
                </label>

                <label
                  htmlFor="admin-category-category"
                  className="categories__label"
                >
                  Опис товару
                  <textarea
                    className="categories__input categories__input--textarea"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Product's description"
                    rows={10}
                  />
                </label>

                <div className="checkbox__group">
                  <label
                    className={cn("checkbox__label", {
                      "checkbox__label--checked": newIsAvailable === true,
                    })}
                  >
                    {" "}
                    Наявність товару
                    <input
                      type="checkbox"
                      className="checkbox__input"
                      checked={newIsAvailable === true}
                      onChange={() => setNewIsAvailable(true)}
                    />
                    В наявності
                  </label>

                  <label
                    className={cn("checkbox__label", {
                      "checkbox__label--checked": newIsAvailable === false,
                    })}
                  >
                    <input
                      type="checkbox"
                      className="checkbox__input"
                      checked={newIsAvailable === false}
                      onChange={() => setNewIsAvailable(false)}
                    />
                    Під замовлення
                  </label>
                </div>
                {((selectedAdminEntity && "size" in selectedAdminEntity) ||
                  selectedAdminEntity === null) && (
                  <label
                    htmlFor="admin-category-category"
                    className="categories__label"
                  >
                    Розмір товару
                    <select
                      value={newSize}
                      onChange={(e) => setSize(e.target.value)}
                      className="categories__input"
                    >
                      {/* If adding a new product, show "Оберіть розмір" */}
                      {selectedAdminEntity === null && selectedSubcategForProdCreating &&
                        <>
                          <option disabled value="">
                            Оберіть розмір
                          </option>
                          {getInitialSizes(
                            selectedSubcategForProdCreating.key
                          )?.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </>
                      }
                      {selectedAdminEntity !== null && selectedSubcategForProdCreating === null &&
                        <>
                          {/* If updating a product, pre-select its size */}
                          <option disabled value={selectedAdminEntity?.size}>
                            {selectedAdminEntity?.size}
                          </option>
                          {getInitialSizes(
                              selectedAdminEntity.subcategory
                          )?.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </>
                      }
                    </select>
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
                type="reset"
                onClick={() => setFormOpen(false)}
              >
                Скасувати створення
              </button>
            </div>
          </form>

          {selectedAdminEntity && (
            <button
              type="reset"
              className="sidebar__submit"
              onClick={() => deleteCurrentEntity(selectedAdminEntity?.id)}
            >
              Видалити товар
            </button>
          )}
        </>
      )}
    </div>
  );
};
