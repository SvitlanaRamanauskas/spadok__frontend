import { cartSelector, removeItem, totalCartPriceSelector, totalCartQuantitySelector } from "../redux/cart/reducerCart";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import "../styles/Cart.scss";
import { CartItem } from "../types/CartItem";
import { Vyshyvanka } from "../types/Vyshyvanka";

export const CartPage = () => {
  const items: CartItem[] = useAppSelector(cartSelector);
  const totalCartQuantity: number = useAppSelector(totalCartQuantitySelector);
  const totalCartPrice: number = useAppSelector(totalCartPriceSelector);

  const dispatch = useAppDispatch();

  // const handlePlus = (id: number) => {
  //     dispatch();
  // };

  // const handleMinus = (id: number) => {
  //     dispatch();
  // }

  const handleRemoveItem = (item: Vyshyvanka) => {
    dispatch(removeItem(item));
  };

  console.log(totalCartPrice);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.item.name}</h2>
            <p>ID: ${item.item.id}</p>
            <p>Price: ${item.item.price * item.quantity}</p>
            <p>Quantity: {item.quantity}</p>
            <button className="cart__remove" onClick={() => handleRemoveItem(item.item)}>Remove</button>
            {/* <button onClick={() => handlePlus(item.id)}>+</button>
                <button onClick={() => handleMinus(item.id)}>-</button> */}
          </li>
        ))}
      </ul>
      <h2>Total Quantity: {totalCartQuantity}</h2>
      <h2>Total Amount: ${totalCartPrice}</h2>
    </div>
  );
};
