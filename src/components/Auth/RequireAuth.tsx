import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { testAuthApi } from "../../fakeAuthApi";

export const RequireAuth = ({ children }: { children: React.ReactNode}) => {
    const { isAuthenticated } = useContext(AppContext);
    console.log("isAuthenticated:", isAuthenticated, testAuthApi()); // Check this log in the browser console

    if (!testAuthApi()) {
      return <Navigate to="/login" replace />;
    }
  
    return <>{children}</>;
}