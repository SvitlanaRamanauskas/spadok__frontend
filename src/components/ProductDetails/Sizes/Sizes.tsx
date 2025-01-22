import { useContext } from "react";
import { AppContext } from "../../appContext";
import classNames from "classnames";
import { isVyshyvanka } from "../../../helper/productUtils";
import {  useNavigate } from "react-router-dom";
import { VyshyvankaDetails } from "../../../types/VyshyvankaDetails";

type Props = {
    setProductDetailsLoading: (value: boolean) => void,
    productDetailsList: VyshyvankaDetails[],
};

export const Sizes: React.FC<Props> = ({ 
    setProductDetailsLoading,
    productDetailsList
}) => {
    const { selectedProduct } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSetAnotherVyshyvankaBySize = (
        currentProdName: string,
        clickedSize: string
    ) => {
        setProductDetailsLoading(true)
    
        const anotherSizeProd = productDetailsList.find(
          (vyshyvanka) =>
            vyshyvanka.name === currentProdName && vyshyvanka.size === clickedSize
        );
    
        if (anotherSizeProd) {
          setTimeout(() => {
            navigate(`/catalog/${anotherSizeProd.category}/${anotherSizeProd.id}`);
            setProductDetailsLoading(false)
          }, 1000);
        }
    };

  return (
    <>
      {selectedProduct !== null && isVyshyvanka(selectedProduct) && (
        <>
          <div className="info__size size">
            <p className="info__name">Розмір:</p>
            <div className="size__elements">
              {selectedProduct.sizesAvailable.map((size) => (
                <button
                  type="button"
                  onClick={() => {
                    // handleSizeClick(size);
                    handleSetAnotherVyshyvankaBySize(
                      selectedProduct?.name,
                      size
                    );
                  }}
                  className={classNames("size__box", {
                    "size__box--active": selectedProduct.size === size,
                  })}
                  key={size}
                  aria-label={`Select ${size} size`}
                >
                  <p
                    className={classNames(
                      "size__value",
                      `size__value--${size}`,
                      {
                        "size__value--active": selectedProduct.size === size,
                      }
                    )}
                  >
                    {size}
                  </p>
                </button>
              ))}
            </div>
          </div>

        <div>
            {selectedProduct.isAvailable ? (
            <p className="info__name info__name--available">В наявності</p>
            ) : (
            <p className="info__name info__name--preordered">
                Під замовлення
            </p>
            )}
        </div>
        </>
      )}
    </>
  );
};
