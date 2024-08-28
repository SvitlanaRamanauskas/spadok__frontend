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
            <h1>Кошик</h1>

            <ul className="cart__list">
              {items.map((item) => (
                <li key={item.id} className="cart__item item">
                  <div className="item__image-wrap">
                    <img src={item.item.images[0]} alt="" className="item__image" />
                  </div>

                  <div className="item__info">
                    <h4 className="item__name">{item.item.name}</h4>
                    <p className="item__code">Артикул: {item.item.id}</p>
                    <p className="item__price">
                      {item.item.price * item.quantity}&#x20b4;
                    </p>
                    <p className="item__size">Розмір: {item.item.size}</p>
                    <button
                      className="item__remove"
                      onClick={() => handleRemoveItem(item.item)}
                    >
                      Видалити з кошика
                    </button>

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
                </li>
              ))}
            </ul>
          </div>

          <div className="cart__summary summary">
            <div className="summary__wrapper">
                <h4 className="summary__title">Ваше замовлення</h4>
                <div className="summary__group">
                    <h5 className="summary__header">Кількість товарів:</h5>
                    <p className="summary__result">{totalCartQuantity}</p>
                </div>
                <div className="summary__group">
                    <h5>Разом до сплати:</h5>
                    <p className="summary__result">{totalCartPrice} &#x20b4;</p>
                </div>
                <button className="button summary__button">Перейти до оформлення</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
