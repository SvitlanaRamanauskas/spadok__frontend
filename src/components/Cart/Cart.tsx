import {
  cartSelector,
  minusItem,
  plusItem,
  removeItem,
  totalCartPriceSelector,
  totalCartQuantitySelector,
} from "../../redux/cart/reducerCart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CartItem } from "../../types/CartItem";
import "./Cart.scss";
import "../../styles/button.scss";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import { ArrowDecorBelow } from "../ArrowDecorBelow";
import { ArrowDecorTop } from "../ArrowDecorTop";
import { Link } from "react-router-dom";

export const Cart = () => {
  const items: CartItem[] = useAppSelector(cartSelector);
  const totalCartQuantity: number = useAppSelector(totalCartQuantitySelector);
  const totalCartPrice: number = useAppSelector(totalCartPriceSelector);

  const dispatch = useAppDispatch();

  const handlePlus = (item: VyshyvankaDetails) => {
    dispatch(plusItem(item));
  };

  const handleMinus = (item: VyshyvankaDetails) => {
    dispatch(minusItem(item));
  };

  const handleRemoveItem = (item: VyshyvankaDetails) => {
    dispatch(removeItem(item));
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart__wrapper">
          <div className="cart__order">
            <div className="cart__title-wrapper">
              <h3 className="cart__title">Кошик</h3>
            </div>

            <ul className="cart__list">
              <ArrowDecorTop />
              <ArrowDecorBelow />
              {items.length > 0 ? (
                items.map((item) => (
                  <li key={item.id} className="cart__item item">
                    <div className="item__image-wrap">
                      <img
                        src={item.item.images[0]}
                        alt=""
                        className="item__image"
                      />
                    </div>

                    <div className="item__info">
                      <div className="item__info--top">
                        <h4 className="item__name">{item.item.name}</h4>

                        <p className="item__price">
                          {item.item.price * item.quantity}&#x20b4;
                        </p>
                      </div>

                      <div className="item__info--bottom">
                        <p className="item__code">Арт.: {item.item.id}</p>
                        <p className="item__size">Розмір: {item.item.size}</p>
                        <div className="item__quantity-setters">
                          <button
                            className="item__quantity-setter"
                            onClick={() => handleMinus(item.item)}
                          >
                            <div className="p">-</div>
                          </button>
                          <p className="item__quantity">{item.quantity}</p>
                          <button
                            className="item__quantity-setter"
                            onClick={() => handlePlus(item.item)}
                          >
                            <div className="p">+</div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      className="item__remove"
                      onClick={() => handleRemoveItem(item.item)}
                    >
                      <img
                        src={require("../../styles/icons/Close.svg").default}
                        alt="remove"
                        className="item__remove-icon"
                      />
                    </button>
                  </li>
                ))
              ) : (
                <p className="cart__empty">В кошику поки немає товарів</p>
              )}
            </ul>
          </div>

          <div className="cart__summary summary">
            <div className="summary__wrapper">
              {items.length > 0 ? (
                <>
                  <h4 className="summary__title">Ваше замовлення</h4>
                  <div className="summary__group">
                    <h5 className="summary__header">Кількість товарів:</h5>
                    <p className="summary__result">{totalCartQuantity}</p>
                  </div>
                  <div className="summary__group">
                    <h5>Разом до сплати:</h5>
                    <p className="summary__result">{totalCartPrice} &#x20b4;</p>
                  </div>
                  <Link to="/order" className="button summary__button">
                    Перейти до оформлення
                  </Link>

                  <Link
                    to="/catalog"
                    className="summary__button summary__button--continue-purchases"
                  >
                    Продовжити покупки
                  </Link>
                </>
              ) : (
                <Link
                  to="/catalog"
                  className="summary__button summary__button--start-purchases"
                >
                  До каталогу
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
