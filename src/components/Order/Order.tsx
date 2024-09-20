import { useEffect, useState } from "react";
import "./Order.scss";
import cn from "classnames";

type Country = {
  value: string;
  flag: string;
  label: string;
};

export const Order = () => {
  const [buyerName, setBuyerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("+38");
  const [expanded, setExpanded] = useState(false);

  const countries: Country[] = [
    { value: "+38", flag: "ua", label: "Ukraine (+38)" },
    { value: "+1", flag: "us", label: "United States (+1)" },
    { value: "+44", flag: "gb", label: "United Kingdom (+44)" },
    { value: "+49", flag: "de", label: "Germany (+49)" },
    { value: "+91", flag: "in", label: "India (+91)" },
  ];

  const handleCountryChange = (countryValue: string) => {
    setSelectedCountry(countryValue);
  };

  const getFlagUrl = (countries: Country[]) => {
    const flag =
      countries.find((c) => c.value === selectedCountry)?.flag || "ua";

    if (flag) {
      return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${flag}.svg`;
    }
  };

  useEffect(() => {
    if (expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [expanded]);

  const handleBuyerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log("Order submitted", {});
  };

  return (
    <article className="order">
      <h5 className="order__section-title">Оформлення замовлення</h5>
      <p className="order__text">
        Будь ласка, вкажіть своє ім'я та номер телефону, щоб наш менеджер міг
        зв'язатись з Вами для обговорення деталей Вашого замовлення
      </p>

      <form
        className="order__form"
        action=""
        method="POST"
        onSubmit={handleSubmit}
      >
        <section className="buyer-info">
          <div className="buyer-info__container">
            <input
              type="tel"
              id="phone-number"
              value={buyerName}
              onChange={handleBuyerNameChange}
              placeholder="Ім'я та прізвище"
              className="buyer-info__input"
            />
          </div>

          <div
            className={cn("buyer-info__container", "phone", {
              "phone--opened": expanded,
            })}
          >
            <div>
              <button
                className="phone__country-selector"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded((current) => !current);
                }}
              >
                {selectedCountry && (
                  <img
                    className="phone__country-flag"
                    src={getFlagUrl(countries)}
                    alt="Selected country flag"
                  />
                )}
                <img
                  className={cn("phone__icon", {
                    "phone__icon--focused": expanded,
                  })}
                  src={
                    require("../../styles/icons/Chevron-Arrow-Right--disabled.svg")
                      .default
                  }
                  alt="Selected country flag"
                />
              </button>

              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder={`${selectedCountry} ...`}
                className="buyer-info__input"
              />
            </div>

            <div>
              <ul id="country__option" className="select">
                {countries.map((country) => (
                  <li
                    data-flag={country.flag}
                    onClick={() => handleCountryChange(country.value)}
                  >
                    <span className="select__flag">
                      <img
                        className="phone__country-flag"
                        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${country.flag}.svg`}
                        alt="Selected country flag"
                      />
                    </span>
                    {country.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <button className="order__confirm-button">
          Підтвердити замовлення
        </button>
      </form>
    </article>
  );
};
