import "../styles/App.scss";
import { useEffect } from "react";
import { scrollToTop } from "../App";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Catalog } from "../components/Catalog/Catalog";

export const CatalogPage = () => {

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <Breadcrumbs />
      
      <Catalog />
    </div>
  );
};
