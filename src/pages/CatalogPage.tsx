import { Link } from "react-router-dom";
import "../styles/App.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scrollToTop } from "../App";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Catalog } from "../components/Catalog/Catalog";

export const CatalogPage = () => {
  const location = useLocation();
  const pathArr = location.pathname.split('/');

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Breadcrumbs />
      
      {pathArr[2] === undefined && (
        <Catalog />
      )}

      <Outlet />
    </>
  );
};
