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
import { ArrowDecorBelow } from "../ArrowDecorBelow";
import { ArrowDecorTop } from "../ArrowDecorTop";
import { Link } from "react-router-dom";
import { DynamicProduct } from "../../types/Product";

export const Cart = () => {
  const items: CartItem[] = useAppSelector(cartSelector);
  const totalCartQuantity: number = useAppSelector(totalCartQuantitySelector);
  const totalCartPrice: number = useAppSelector(totalCartPriceSelector);

  const dispatch = useAppDispatch();

  const handlePlus = (item: DynamicProduct) => {
    dispatch(plusItem(item));
  };

  const handleMinus = (item: DynamicProduct) => {
    dispatch(minusItem(item));
  };

  const handleRemoveItem = (item: DynamicProduct) => {
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
                    <Link to={`/catalog/${item.item.category}/${item.item.id}`} className="item__image-wrap">
                      <img
                        src={`${process.env.PUBLIC_URL}/${item.item.images[0]}`}
                        alt=""
                        className="item__image"
                      />
                    </Link>

                    <div className="item__info">
                      <div className="item__info--top">
                        <Link to={`/catalog/${item.item.category}/${item.item.id}`} className="item__name-link">
                          <h4 className="item__name">{item.item.title}</h4>
                        </Link>

                        <p className="item__price">
                          {item.item.price * item.quantity} &#x20b4;
                        </p>
                      </div>

                      <div className="item__info--bottom">
                        <p className="item__detailed">Арт.: {item.item.id}</p>
                        {"size" in item.item && (
                          <p className="item__detailed">Розмір: {item.item.size}</p>
                        )}
                        
                        <div className="item__quantity-setters">
                          <button
                            className="item__quantity-setter"
                            onClick={() => handleMinus(item.item)}
                          >
                            <p className="item__quantity-sign">-</p>
                          </button>
                          <p className="item__quantity">{item.quantity}</p>
                          <button
                            className="item__quantity-setter"
                            onClick={() => handlePlus(item.item)}
                          >
                            <p className="item__quantity-sign">+</p>
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
                    <p className="summary__header">Кількість товарів:</p>
                    <p className="summary__result">{totalCartQuantity}</p>
                  </div>
                  <div className="summary__group">
                    <p className="summary__header">Разом до сплати:</p>
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
