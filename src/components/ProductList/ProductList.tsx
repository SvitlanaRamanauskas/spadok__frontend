import { Link } from "react-router-dom";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import './ProductList.scss';
import '../../styles/App.scss';
import { ProductCard } from "../ProductCard";

type Props = {
    items: Vyshyvanka[]
}

export const VyshyvankaList: React.FC<Props> = ({ items }) => {
    return (
        <div className="list">
            {items.map((item: Vyshyvanka) => (
                <div 
                    className="list__card"
                    key={item.id}
                >
                   <ProductCard item={item} items={items} />
                </div>
            ))}
        </div>
    );
}