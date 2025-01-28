import { useContext, useState } from "react";
import "./Auth.scss";
import "../../styles/App.scss";
import { Loader } from "../Loader";
import { fakeAuthAPI } from "../../fakeAuthApi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";


export const Auth: React.FC = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!nameInput || !passwordInput) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response: any = await fakeAuthAPI(nameInput, passwordInput);
      if (!error && nameInput && passwordInput) {
        // Якщо успішно — зберігаємо токен (припустимо, тут він зберігається через HTTPOnly cookie)
        console.log("Login successful, token:", response.token);

        localStorage.setItem('authToken', 'mockToken'); // Mock token for testing
        setIsAuthenticated(true);
        navigate("/admin");
      }

      // const response = await fetch("api/auth/login/", { 
      //   method: "POST", 
      //   headers: { 
      //     "Content-Type": "application/json"
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     email: nameInput,
      //     password: passwordInput
      //   })
      // })

      // if(!response.ok) {
      //   const errorData = await response.json();
      //   setLoading(false);
      //   setError(errorData.message || "Login Failed");
      //   return;
      // }

    } catch (err){
       setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="auth auth--visible">
        <div className="auth__content">

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
                  onChange={(e) => {
                    setNameInput(e.target.value)
                    validateInput(e.target.value);
                  }}
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
                  }}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <button 
                className="button auth__button--submit" 
                type="submit" 
                disabled={!!error || loading}
              >
                {loading ? <Loader /> : "Submit"} 
              </button>
            </fieldset>
          </form>
        </div>
      </div>
  );
};
