import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { WomenPage } from "./pages/WomenPage";
import { AppProvider } from "./components/appContext";
import { MenPage } from "./pages/MenPage";
import { BoysPage } from "./pages/BoysPage";
import { GirlsPage } from "./pages/GirlsPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { FavoritesPage } from "./pages/FavoritesPage";
import { BooksPage } from "./pages/BooksPage";
import { CatalogPage } from "./pages/CatalogPage";
import { OrderPage } from "./pages/OrderPage";
import ScrollToTop from "./components/scrollToTop";

export const Root = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<App />}>
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route index element={<HomePage />} />
              <Route path="catalog" >
                <Route index element={<CatalogPage />}/>
                <Route path="women" element={<WomenPage />} />
                <Route
                  path="women/:productId"
                  element={<ProductDetailsPage />}
                />

                <Route path="men" element={<MenPage />} />
                <Route path="men/:productId" element={<ProductDetailsPage />} />

                <Route path="boys" element={<BoysPage />} />
                <Route
                  path="boys/:productId"
                  element={<ProductDetailsPage />}
                />

                <Route path="girls" element={<GirlsPage />} />
                <Route
                  path="girls/:productId"
                  element={<ProductDetailsPage />}
                />

                <Route path="books" element={<BooksPage />} />
                <Route
                  path="books/:productId"
                  element={<ProductDetailsPage />}
                />
              </Route>
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
{/* 
              <Route path="*" element={<NotFoundPage /> }/> */}
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </Provider>
  );
};
