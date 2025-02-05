import { Dispatch, SetStateAction, useState } from "react";
import { createAdminCategory, createAdminSubcategory } from "../../../helper/fetch";
import { Loader } from "../../Loader";
import { AdminCategory, AdminSubcategory } from "../../../types/AdminNames";

type Props<T extends AdminCategory | AdminSubcategory> = {
  setAdminCategories: Dispatch<SetStateAction<T[]>>;
  adminCategories: T[];
  type: "category" | "subcategory";
};

export const AddCategory = <T extends AdminCategory | AdminSubcategory>({
  setAdminCategories,
  adminCategories,
  type
}: Props<T>) => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryKey, setNewCategoryKey] = useState("");
    const [newCategoryId, setNewCategoryId] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newCategoryInputOpen, setNewCategoryInputOpen] = useState(false);

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
      (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);

    const addEntity = async () => {
        try {
          const newEntity = await (type === "category" ? createAdminCategory({
            name: newCategoryName,
            key: newCategoryKey,
            id: newCategoryId,
          }) : (createAdminSubcategory({
            name: newCategoryName,
            key: newCategoryKey,
            id: newCategoryId,
            category:parentCategory,
          }))) as T;
    
          setAdminCategories((prev) => [...prev, newEntity]);
        } catch (error) {
          console.error(`Error adding ${type}:`, error);
        }
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
          await addEntity();
          setNewCategoryInputOpen(false);
          reset();
        } catch (error) {
          console.error(`Failed to submit ${type}:`, error);
        } finally {
          setIsSubmitting(false);
        }
      };

  return (
    <div className="categories__adding-place">
      {newCategoryInputOpen && (
        <form
          className="categories__form"
          onSubmit={handleSubmit}
          onReset={reset}
        >
          <label htmlFor="admin-category-name" className="categories__label">
            {type === "category" ? "Category name" : "Subcategory name"}
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
            {type === "category" ? "Category key" : "Subcategory key"}
            <input
              type="text"
              className="categories__input"
              value={newCategoryKey}
              onChange={handleChange(setNewCategoryKey)}
              placeholder="Category Key"
            />
          </label>
          <label htmlFor="admin-category-id" className="categories__label">
            {type === "category" ? "Category id" : "Subcategory id"}
            <input
              type="text"
              className="categories__input"
              value={newCategoryId}
              onChange={handleChange(setNewCategoryId)}
              placeholder="Category Id"
            />
          </label>
          {type === "subcategory" && (
            <label htmlFor="admin-category-category" className="categories__label">
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

          <div className="categories__buttons">
            <button
              className="categories__button admin__button admin__button--close"
              type="submit"
            >
              {!isSubmitting ? "Зберегти" : <Loader />}
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
              onClick={() => setNewCategoryInputOpen(false)}
            >
              Скасувати створення
            </button>
          </div>
        </form>
      )}
      {!newCategoryInputOpen && (
        <button
          className="admin__button admin__button--close"
          onClick={() => setNewCategoryInputOpen(true)}
        >
          {type === "category" ? "додати категорію" : "додати субкатегорію"}
        </button>
      )}
    </div>
  );
};
