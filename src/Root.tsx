import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { SubcategoryPage } from "./pages/SubcategoryPage";
import { AppProvider } from "./components/appContext";

import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CatalogPage } from "./pages/CatalogPage";
import { OrderPage } from "./pages/OrderPage";
import ScrollToTop from "./components/scrollToTop";
import { BestsellersPage } from "./pages/BestsellerPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminPage } from "./pages/AdminPage";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { LoginPage } from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { AdminSubcategory } from "./types/AdminNames";
import { fetchSubcategoriesList } from "./helper/fetch/adminFetch";
import { ItemsNotFound } from "./components/ItemsNotFound";

export const Root = () => {
  const [subcategories, setSubcategories] = useState<AdminSubcategory[] | []>(
    []
  );

  useEffect(() => {
    const loadSubcategories = async () => {
      try {
        // const categories: AdminCategory[] = await fetchCategoriesList();
        // setCategories(categories);
        const data: AdminSubcategory[] = await fetchSubcategoriesList();
        setSubcategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadSubcategories();
  }, []);

  return (
    <Provider store={store}>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<App />}>
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="admin"
                element={
                  <RequireAuth>
                    <AdminPage />
                  </RequireAuth>
                }
              />

              <Route path="catalog">
                <Route index element={<CatalogPage />} />

                {subcategories.map((subcategory) => (
                  <Route
                    key={subcategory.key}
                    path=":subcategoryKey"
                    element={<SubcategoryPage />}
                  />
                ))}

                {subcategories.map((subcategory) => (
                  <Route
                    key={`${subcategory.key}-details`}
                    path=":subcategoryKey/:productId"
                    element={<ProductDetailsPage />}
                  />
                ))}
              </Route>

              <Route path="/bestsellers" element={<BestsellersPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </Provider>
  );
};
