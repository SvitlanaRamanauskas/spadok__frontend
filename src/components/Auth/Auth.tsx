import { useState } from "react";
import cn from "classnames";
import "./Auth.scss";
import "../../styles/App.scss";

type Props = {
    authIsOpen: boolean;
    setAuthIsOpen: (value: boolean) => void;
}


export const Auth: React.FC<Props> = ({ authIsOpen, setAuthIsOpen }) => {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string) => {
    setError("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
      /^\+?\d{1,4}?[-.\s]?(\(?\d{1,3}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (emailPattern.test(value)) {
      setError("");
    } else if (phonePattern.test(value)) {
      setError("");
    } else {
      setError("Please enter a valid email address or phone number.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && nameInput && passwordInput) {
      console.log("Submitted:", nameInput, passwordInput);
      // Handle form submission logic here
    }
  };

  return (
      <div className={cn( "auth", { 
        "auth--visible" : authIsOpen, 
        "auth--hidden" : !authIsOpen,
        })}>
        <div className="auth__content">
          <button className="auth__button--close" onClick={() => setAuthIsOpen(false)}>x</button>
          <form onSubmit={handleSubmit} className="auth__form">
            <fieldset className="auth__fieldset">
              <h3 className="auth__title">Log In</h3>
              <div className="auth__input-container">
                <label htmlFor="name"></label>
                <input
                  id="name"
                  type="text"
                  className="auth__input auth__input--name"
                  placeholder="email or phone number"
                  onChange={(e) => setNameInput(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="auth__input-container">
                <label htmlFor="password"></label>
                <input
                  id="password"
                  type="password"
                  className="auth__input auth__input--email"
                  placeholder="password"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    validateInput(e.target.value);
                  }}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <button className="button auth__button--submit" type="submit" disabled={!!error}>
                Submit
              </button>
            </fieldset>

            <div className="auth__options">
              <button type="button" className="auth__reset-password">Забули пароль?</button>
              <button type="button" className="auth__sign">Зареєструватися</button> 
            </div>
          </form>
        </div>
      </div>
  );
};
