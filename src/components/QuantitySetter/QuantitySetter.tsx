import { minusItem, plusItem } from "../../redux/cart/reducerCart";
import { useAppDispatch } from "../../redux/hooks";
import { CartItem } from "../../types/CartItem";
import { DynamicProduct } from "../../types/Product";
import "./Quantity-setter.scss";

type Props = {
  item: CartItem;
}

export const QuantitySetter: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handlePlus = (item: DynamicProduct) => {
    dispatch(plusItem(item));
  };

  const handleMinus = (item: DynamicProduct) => {
    dispatch(minusItem(item));
  };

  return (
    <div className="quantity__setters">
      <button
        className="quantity__setter"
        onClick={() => handleMinus(item.item)}
      >
        <p className="quantity__sign">-</p>
      </button>
      <p className="quantity">{item.quantity}</p>
      <button
        className="quantity__setter"
        onClick={() => handlePlus(item.item)}
      >
        <p className="quantity__sign">+</p>
      </button>
    </div>
  );
};
