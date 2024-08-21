import { 
    HashRouter as Router,
    Routes,
    Route,
    Navigate
 } from "react-router-dom"
import App from "./App"
import { HomePage } from "./pages/HomePage"
import { WomenPage } from "./pages/WomenPage"
import { AppProvider } from "./components/appContext"
import { MenPage } from "./pages/MenPage"
import { BoysPage } from "./pages/BoysPage"
import { GirlsPage } from "./pages/GirlsPage"
import { CartPage } from "./pages/CartPage"
import { VyshyvankaDetailsPage } from "./pages/VyshyvankaDetailsPage"
import store from "./redux/store"
import { Provider } from "react-redux"
import { FavoritesPage } from "./pages/FavoritesPage"

export const Root = () => {
    return (    
        <Provider store={store} >
            <AppProvider>
                <Router>
                    <Routes>
                        <Route element={<App />}>
                            <Route path="home" element={<Navigate to="/" replace />} />
                            <Route index element={<HomePage />} />
                            <Route path="women">
                                <Route index element={<WomenPage />} />
                                <Route path=":vyshyvankaId" element={<VyshyvankaDetailsPage />} />
                            </Route>
                            <Route path="men">
                                <Route index element={<MenPage />} />
                                <Route path=":vyshyvankaId" element={<VyshyvankaDetailsPage />} />
                            </Route>
                            <Route path="boys">
                                <Route index element={<BoysPage />} />
                                <Route path=":vyshyvankaId" element={<VyshyvankaDetailsPage />} />
                            </Route>
                            <Route path="girls">
                                <Route index element={<GirlsPage />} />
                                <Route path=":vyshyvankaId" element={<VyshyvankaDetailsPage />} />
                            </Route>
                            <Route path="/favorites" element={<FavoritesPage />} />
                            <Route path="/cart" element={<CartPage />} />
                        </Route>
                    </Routes>
                </Router>
            </AppProvider>
        </Provider>
    )
}
