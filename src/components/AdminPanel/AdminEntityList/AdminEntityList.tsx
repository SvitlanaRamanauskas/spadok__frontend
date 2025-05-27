import { Dispatch, SetStateAction } from "react";
import "./AdminEntityList.scss";
import { DynamicProduct } from "../../../types/Product";
import cn from "classnames";
import { getProductById } from "../../../helper/fetch/fetch";
import { AdminCategory, AdminSubcategory } from "../../../types/AdminNames";
import { getCategoryById, getSubcategoryById } from "../../../helper/fetch/adminFetch";

type SetSelectedEntity<T> = Dispatch<SetStateAction<T | null>>;

type Props<T extends AdminCategory | AdminSubcategory | DynamicProduct> = {
  entityType: string;
  selectedAdminEntity: T | null;
  adminEntityList: T[];
  setSelectedAdminEntity: SetSelectedEntity<T>;
  setLoadingAdminEntityDetails: (value: boolean) => void;
  setErrorEntityDetails: (value: boolean) => void;
  setEntityUpdateFormOpen: (value: boolean) => void;
};

export const AdminEntityList = <
  T extends AdminCategory | AdminSubcategory | DynamicProduct,
>({
  entityType,
  selectedAdminEntity,
  adminEntityList,
  setSelectedAdminEntity,
  setLoadingAdminEntityDetails,
  setErrorEntityDetails,
  setEntityUpdateFormOpen,
}: Props<T>) => {
  const handleOpenCloseEntity = (entity: T) => {
    if (selectedAdminEntity?.id === entity.id) {
      setSelectedAdminEntity(null);
      setEntityUpdateFormOpen(false);
      return;
    }

    fetchEntityDetails(entity.id);
    setEntityUpdateFormOpen(true);
  };

  const fetchEntityDetails = (id: number) => {
    setErrorEntityDetails(false);
    setLoadingAdminEntityDetails(true);

    if (entityType === "category") {
      getCategoryById(id)
        .then((data) => {
          if (data) {
            setSelectedAdminEntity(data as T);
          }
        })
        .catch((error) => {
          setErrorEntityDetails(true);
          console.error("Failed to fetch category details:", error);
        })
        .finally(() => setLoadingAdminEntityDetails(false));
      return;
    }

    if (entityType === "subcategory") {
      getSubcategoryById(id)
        .then((data) => {
          if (data) {
            setSelectedAdminEntity(data as T);
          }
        })
        .catch((error) => {
          setErrorEntityDetails(true);
          console.error("Failed to fetch subcategory details:", error);
        })
        .finally(() => setLoadingAdminEntityDetails(false));
      return;
    } else {
      getProductById(id)
        .then((data) => {
          if (data) {
            setSelectedAdminEntity(data as T);
          }
        })
        .catch((error) => {
          setErrorEntityDetails(true);
          console.error("Failed to fetch product details:", error);
        })
        .finally(() => setLoadingAdminEntityDetails(false));
    }
  };

  return (
    <div
      className={cn("admin__left", "tile", {
        "admin__left--open": !selectedAdminEntity,
      })}
    >
      <table className="admin__table">
        <thead className="admin__thead">
          <tr className="admin__thead-tr">
            <th className="admin__thead-tr-th">id</th>

            <th className="admin__thead-tr-th">
              {selectedAdminEntity && "key" in selectedAdminEntity
                ? "name"
                : "title"}
            </th>
            <th className="admin__thead-tr-th">
              {selectedAdminEntity && "key" in selectedAdminEntity
                ? "key"
                : "subcategoryId"}
            </th>
            <th className="admin__thead-tr-th">open/close</th>
          </tr>
        </thead>

        <tbody className="admin__tbody">
          {(adminEntityList as T[]).map((entity: T) => (
            <tr className="admin__tbody-tr" key={entity.id}>
              <td className="admin__tbody-tr-td">{entity.id}</td>
              <td className="admin__tbody-tr-td">
                {entityType === "category" || entityType === "subcategory"
                  ? entity.name
                  : (entity as DynamicProduct).title}
              </td>
              <td className="admin__tbody-tr-td">
                {entityType === "category" || entityType === "subcategory"
                  ? entity.key
                  : (entity as DynamicProduct).subcategoryId}
              </td>
              <td className="admin__tbody-tr-td">
                <button
                  onClick={() => handleOpenCloseEntity(entity)}
                  className={cn("admin__button", {
                    "admin__button--open":
                      selectedAdminEntity?.id !== entity.id,
                    "admin__button--close":
                      selectedAdminEntity?.id === entity.id,
                  })}
                >
                  {selectedAdminEntity?.id === entity.id ? "Close" : "Open"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
