import { useContext } from "react";
import { AppContext } from "../../appContext";
import "./Sizes.scss";
import classNames from "classnames";
import { isForAdults, isForKids } from "../../../helper/productUtils";
import { useNavigate } from "react-router-dom";
import { Vyshyvanka, VyshyvankaUI } from "../../../types/Vyshyvanka";
import { Dropdown } from "../../Dropdown";
import { transformToProductUI } from "../../../helper/transformToProdIU";
import { DynamicProduct } from "../../../types/Product";

type Props = {
  setProductDetailsLoading: (value: boolean) => void;
  vyshyvankyFromServer: VyshyvankaUI[];
  setProductNotFound: (value: boolean) => void;
};

export const Sizes: React.FC<Props> = ({
  setProductDetailsLoading,
  vyshyvankyFromServer,
  setProductNotFound,
}) => {
  const { selectedProduct } = useContext(AppContext);
  const selectedProductUI = transformToProductUI(
    selectedProduct as DynamicProduct
  );

  const navigate = useNavigate();

  const handleSetAnotherVyshyvankaBySize = (
    currentProdTitle: string,
    clickedSize: string
  ) => {
    setProductDetailsLoading(true);

    const anotherSizeProd = vyshyvankyFromServer.find((vyshyvanka) => {
      return (
        vyshyvanka.title === currentProdTitle && vyshyvanka.size === clickedSize
      );
    });

    if (anotherSizeProd) {
      console.log("anotherSizeProd1", anotherSizeProd)
      setTimeout(() => {
        navigate(`/catalog/${anotherSizeProd.subcategory}/${anotherSizeProd.id}`);
        setProductDetailsLoading(false);
      }, 1000);
    } else {
      
       console.log("anotherSizeProd2", anotherSizeProd)
      return;
    }

     console.log("anotherSizeProd3", anotherSizeProd)
  };

  const handleSizeChoise = (selectedSize: string) => {
    if (selectedProduct === null) return;
    handleSetAnotherVyshyvankaBySize(selectedProduct.title, selectedSize);
  };
  console.log("Sizes");

  return (
    <>
      {selectedProduct !== null && (
        <>
          {isForKids(selectedProductUI) && (
            <div className="size">
              <Dropdown
                options={selectedProduct.sizesAvailable}
                dropdownName={"Обрати розмір"}
                onChoise={handleSizeChoise}
              />
            </div>
          )}

          {isForAdults(selectedProductUI) && (
            <div className="size">
              <div className="size__elements">
                {(selectedProduct as Vyshyvanka).sizesAvailable.map((size) => (
                  <button
                    type="button"
                    onClick={() => {
                      handleSetAnotherVyshyvankaBySize(
                        selectedProduct.title,
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
          )}

          <div>
            {selectedProduct.isAvailable > 0 ? (
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
