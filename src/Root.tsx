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

export const Root = () => {
    return (    
        <AppProvider>
            <Router>
                <Routes>
                    <Route element={<App />}>
                        <Route path="home" element={<Navigate to="/" replace />} />
                        <Route index element={<HomePage />} />
                        <Route path="women">
                            <Route index element={<WomenPage />} />
                        </Route>

                        <Route path="men">
                            <Route index element={<MenPage />} />
                        </Route>

                        <Route path="boys">
                            <Route index element={<BoysPage />} />
                        </Route>

                        <Route path="girls">
                            <Route index element={<GirlsPage />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AppProvider>
    )
}
