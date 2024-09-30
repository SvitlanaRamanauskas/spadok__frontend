import { forwardRef, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import "./Order.scss";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  cartSelector,
  minusItem,
  plusItem,
  removeItem,
  totalCartPriceSelector,
  totalCartQuantitySelector,
} from "../../redux/cart/reducerCart";
import { CartItem } from "../../types/CartItem";
import { Link } from "react-router-dom";
import { ArrowDecorTop } from "../ArrowDecorTop";
import { ArrowDecorBelow } from "../ArrowDecorBelow";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import { BookDetails } from "../../types/BookDetails";

type Country = {
  code: string;
  flag: string;
  label: string;
  pattern: string;
};

const countries: Country[] = [
  {
    code: "+380",
    flag: "ua",
    label: "Ukraine (+380)",
    pattern: "99 999 99 99",
  },
  {
    code: "+1",
    flag: "us",
    label: "United States (+1)",
    pattern: "999 999 9999",
  },
  {
    code: "+44",
    flag: "gb",
    label: "United Kingdom (+44)",
    pattern: "99 9999 9999",
  },
  { code: "+49", flag: "de", label: "Germany (+49)", pattern: "999 99999999" },
  { code: "+48", flag: "pl", label: "Poland (+48)", pattern: "99 999 99 99" },
  { code: "+1", flag: "ca", label: "Canada (+1)", pattern: "999 999 9999" },
  { code: "+371", flag: "lv", label: "Latvia (+371)", pattern: "9999 9999" },
  {
    code: "+370",
    flag: "lt",
    label: "Lithuania (+370)",
    pattern: "9 999 9999",
  },
  { code: "+372", flag: "ee", label: "Estonia (+372)", pattern: "999 9999" },
  { code: "+359", flag: "bg", label: "Bulgaria (+359)", pattern: "9 999 9999" },
];

export const CustomInputMask = forwardRef<HTMLInputElement, any>(
  (props, ref) => (
    <InputMask {...props} inputRef={ref as React.Ref<HTMLInputElement>} />
  )
);

export const Order = () => {
  const [buyerName, setBuyerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [expanded, setExpanded] = useState(false);

  const items: CartItem[] = useAppSelector(cartSelector);
  const totalCartQuantity: number = useAppSelector(totalCartQuantitySelector);
  const totalCartPrice: number = useAppSelector(totalCartPriceSelector);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setExpanded(false);
  };

  const getFlagUrl = (countries: Country[]) => {
    const flag =
      countries.find((c) => c.code === selectedCountry?.code)?.flag || "ua";

    if (flag) {
      return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${flag}.svg`;
    }
  };

  useEffect(() => {
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

  const getNameOrTitle = (item: CartItem) => {
    return "name" in item.item ? item.item.name : item.item.title;
  };

  return (
    <article className="order">
      <h5 className="order__section-title">Оформлення замовлення</h5>

      <section className="order__from-cart">
        <ArrowDecorTop />
        <ArrowDecorBelow />

        <ul className="order__list">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="order__cart-item cart-item">
                <Link
                  to={`/catalog/${item.item.category}/${item.item.id}`}
                  className="cart-item__image-wrap"
                >
                  <img
                    src={item.item.images[0]}
                    alt=""
                    className="cart-item__image"
                  />
                </Link>
                <div className="cart-item__info">
                  <Link
                    to={`/catalog/${item.item.category}/${item.item.id}`}
                    className="cart-item__name-link"
                  >
                    <h4 className="cart-item__name">{getNameOrTitle(item)}</h4>
                  </Link>
                  <p className="cart-item__detailed">Арт.: {item.item.id}</p>
                  {"size" in item.item && (
                    <p className="cart-item__detailed">
                      Розмір: {item.item.size}
                    </p>
                  )}
                  <p className="cart-item__price">
                    {item.item.price * item.quantity}&#x20b4;
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="cart__empty">Немає товарів для оформлення замовлення</p>
          )}
        </ul>

        <p className="order__sum">
          {`Всього: ${totalCartPrice} грн`}
        </p>
      </section>

      {items.length > 0 ? (
        <section className="order__checkout">
          <p className="order__text">
            Будь ласка, вкажіть своє ім'я та номер телефону, щоб наш менеджер
            міг зв'язатись з Вами для обговорення деталей Вашого замовлення
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
                  type="text"
                  id="name"
                  value={buyerName}
                  onChange={handleBuyerNameChange}
                  placeholder="Ім'я та прізвище"
                  className="buyer-info__input"
                  required
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
                    {selectedCountry?.code && (
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
                  <CustomInputMask
                    mask={`${selectedCountry?.code} ${selectedCountry?.pattern}`}
                    type="tel"
                    id="phone-number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder={`${selectedCountry?.code} ...`}
                    className="buyer-info__input"
                    ref={inputRef}
                    required
                  ></CustomInputMask>
                </div>
                <div>
                  <ul id="country__option" className="select">
                    {countries.map((country) => (
                      <li
                        key={country.flag}
                        data-flag={country.flag}
                        onClick={() => handleCountryChange(country)}
                        className="select__option"
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
            <button className="button order__confirm-button">
              Підтвердити замовлення
            </button>
          </form>
        </section>
      ) : (
        <Link to="/catalog" className="order__empty">
          Продовжити покупки
        </Link>
      )}
    </article>
  );
};
