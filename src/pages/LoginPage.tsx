import { useState } from "react";
import { Auth } from "../components/Auth";

export const LoginPage = () => {

    return (
      <div className="login-page">
        <h2 className="login-page__title">Login to Your Account</h2>
        <Auth  />
      </div>
    );
  };