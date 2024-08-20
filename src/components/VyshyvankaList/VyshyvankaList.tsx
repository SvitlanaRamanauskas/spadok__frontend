import { Link } from "react-router-dom";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import './VyshyvankaList.scss';
import '../../styles/App.scss';
import { ProductCard } from "../ProductCard";

type Props = {
    items: Vyshyvanka[]
}

export const VyshyvankaList: React.FC<Props> = ({ items }) => {
    return (
        <div className="vyshyvanka__list">
            {items.map((item: Vyshyvanka) => (
                <div 
                    className="vyshyvanka__card"
                    key={item.id}
                >
                   <ProductCard item={item} items={items} />
                </div>
            ))}
        </div>
    );
}