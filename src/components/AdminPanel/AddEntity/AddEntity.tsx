import { Dispatch, SetStateAction, useState } from "react";
import {
  createAdminCategory,
  createAdminSubcategory,
  createBook,
  createVyshyvanka,
  deleteProduct,
  updateEntity,
} from "../../../helper/fetch";
import { Loader } from "../../Loader";
import { AdminCategory, AdminSubcategory } from "../../../types/AdminNames";
import { Vyshyvanka } from "../../../types/Vyshyvanka";
import { Book } from "../../../types/Book";
import { DynamicProduct } from "../../../types/Product";

type Props<T extends AdminCategory | AdminSubcategory | DynamicProduct> = {
  setAdminEntities: Dispatch<SetStateAction<T[]>>;
  adminEntities: T[];
  chosenCategory: string | undefined;
  selectedAdminEntity?: AdminCategory | AdminSubcategory | DynamicProduct | null;
};

export const AddEntity = <
  T extends AdminCategory | AdminSubcategory | DynamicProduct,
>({
  setAdminEntities,
  adminEntities,
  chosenCategory,
  selectedAdminEntity
}: Props<T>) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryKey, setNewCategoryKey] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newImage, setNewImage] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const [newProductId, setNewProductId] = useState(selectedAdminEntity?.id || "");
  const [newCategory, setNewCategory] = useState(selectedAdminEntity && "category" in selectedAdminEntity 
    ? selectedAdminEntity?.category
    : "");
  const [newSubcategory, setSubcategory] = useState(selectedAdminEntity && "subcategory" in selectedAdminEntity
    ? selectedAdminEntity?.subcategory
    : "");
  const [newTitle, setNewTitle] = useState(selectedAdminEntity && "title" in selectedAdminEntity
    ? selectedAdminEntity?.title 
    : "");
  const [newImages, setNewImages] = useState<string[]>(selectedAdminEntity && "images" in selectedAdminEntity
    ? selectedAdminEntity?.images 
    : []);
  const [newPrice, setNewPrice] = useState(selectedAdminEntity && "price" in selectedAdminEntity
    ? selectedAdminEntity?.price 
    : 0);
  const [newDescription, setNewDescription] = useState(selectedAdminEntity && "description" in selectedAdminEntity
    ? selectedAdminEntity?.description 
    : "");
  const [newIsAvailable, setNewIsAvailable] = useState(selectedAdminEntity && "isAvailable" in selectedAdminEntity
    ? selectedAdminEntity?.isAvailable 
    : false);
  const [newSize, setSize] = useState(selectedAdminEntity && "size" in selectedAdminEntity
    ? selectedAdminEntity.size
    : "");
  const [newSizesAvailable, setNewSizesAvailable] = useState<string[]>(selectedAdminEntity && "sizesAvailable" in selectedAdminEntity
    ? selectedAdminEntity.sizesAvailable
    : []);

  const [newGenre, setNewGenre] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEntityInputOpen, setNewEntityInputOpen] = useState(false);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  const addEntity = async () => {
    try {
      let newEntity: AdminCategory | AdminSubcategory | DynamicProduct;

      switch (chosenCategory) {
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
          throw new Error(`Unknown entity type: ${chosenCategory}`);
      }
      setAdminEntities((prev) => [...prev, newEntity as T]);
    } catch (error) {
      console.error(`Error adding ${chosenCategory}:`, error);
    }
  };

  const deleteCurrentEntiry = async (id: string) => {

    try {
      await deleteProduct(id);

      setAdminEntities((currentEntities) =>
        (currentEntities as T[]).filter((entity) => entity.id !== id)
      );
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  
  const editSelectedEntity = (updatedEntity: T, type: string) => {
    return updateEntity(type, updatedEntity)
    .then(editedEntity => setAdminEntities(currents => 
      currents.map(entity => 
        entity.id === editedEntity.id ? updatedEntity : entity
      )
    ))
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
      if(selectedAdminEntity) {
         const edditedEntity = {    
          ...(chosenCategory === "category" && { 
            name: newCategoryName,
            key: newCategoryKey,
            id: newCategoryId,
          }),
          ...(chosenCategory === "subcategory" && { 
            name: newCategoryName,
            key: newCategoryKey,
            id: newCategoryId,
            category: parentCategory,
          }),
          ...(chosenCategory === "vyshyvanka" && { 
            id: newProductId,
            category: newCategory,
            subcategory: newSubcategory,
            title: newTitle,
            images: newImages,
            price: newPrice,
            description: newDescription,
            isAvailable: newIsAvailable
          }),
          ...(chosenCategory === "book" &&  {
            id: newProductId,
            category: newCategory,
            subcategory: newSubcategory,
            title: newTitle,
            price: newPrice,
            images: newImages,
            genre: newGenre,
            description: newDescription,
            isAvailable: newIsAvailable,
          })
        } as T;

        await editSelectedEntity(edditedEntity, chosenCategory as string)
      } else {
        await addEntity();
      }

      setNewEntityInputOpen(false);
      reset();
    } catch (error) {
      console.error(`Failed to submit ${chosenCategory}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {(!newEntityInputOpen || !selectedAdminEntity) && (
        <button
          className="admin__button admin__button--close"
          onClick={() => setNewEntityInputOpen(true)}
        >
          {chosenCategory === "category"
            ? "додати категорію"
            : chosenCategory === "subcategory"
              ? "додати субкатегорію"
              : chosenCategory === "vyshyvanka"
                ? "додати вишиванку"
                : "додати книгу"}
        </button>
      )}
      {newEntityInputOpen && (
        <>
          <form
            className="categories__form"
            onSubmit={handleSubmit}
            onReset={reset}
          >
            { chosenCategory === "category" || chosenCategory === "subcategory" ? (
              <>
                <label htmlFor="admin-category-name" className="categories__label">
                {chosenCategory === "category" ? "Category name" : "Subcategory name"}
                <input
                  type="text"
                  id="admin-category-name"
                  className="categories__input"
                  value={newCategoryName}
                  onChange={handleChange(setNewCategoryName)}
                  placeholder="Category Name"
                />
                </label>

                <label htmlFor="admin-category-key" className="categories__label">
                {chosenCategory === "category" ? "Category key" : "Subcategory key"}
                <input
                  type="text"
                  className="categories__input"
                  value={newCategoryKey}
                  onChange={handleChange(setNewCategoryKey)}
                  placeholder="Category Key"
                />
                </label>

                <label htmlFor="admin-category-id" className="categories__label">
                {chosenCategory === "category" ? "Category id" : "Subcategory id"}
                <input
                  type="text"
                  className="categories__input"
                  value={newCategoryId}
                  onChange={handleChange(setNewCategoryId)}
                  placeholder="Category Id"
                />
                </label>
              
              {chosenCategory === "subcategory" && (
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
            ) : (<>
              <label
                htmlFor="admin-category-category"
                className="categories__label"
              >
                
              <input
                type="text"
                className="categories__input"
                value={newTitle}
                onChange={handleChange(setNewTitle)}
                placeholder="Product's itle"
              />
            </label>
            </>
            
            ) }
            

            <div className="categories__buttons">
              <button
                className="categories__button admin__button admin__button--close"
                type="submit"
              >
                {!isSubmitting && selectedAdminEntity ? (
                  "Змінити"
                ) : !isSubmitting && !selectedAdminEntity ? (
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
                onClick={() => setNewEntityInputOpen(false)}
              >
                Скасувати створення
              </button>
            </div>
          </form>

          {selectedAdminEntity && (
            <button
              type="reset"
              className="sidebar__submit"
              onClick={() => deleteCurrentEntiry(selectedAdminEntity?.id)}
            >
              Видалити товар
            </button>
          )}
        </>
      )}
    </div>
  );
};
