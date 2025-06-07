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

  console.log("selectedProduct", selectedProduct);
  console.log("vysh fromServer", vyshyvankyFromServer);

  const handleSetAnotherVyshyvankaBySize = (
    currentProdTitle: string,
    clickedSize: string
  ) => {
    console.log("currentProdTitle", currentProdTitle);
    console.log("clickedSize", clickedSize);
    setProductDetailsLoading(true);

    const anotherSizeProd = vyshyvankyFromServer.find((vyshyvanka) => {
      console.log("titles", vyshyvanka.title);
      return (
        vyshyvanka.title === currentProdTitle && vyshyvanka.size === clickedSize
      );
    });
    console.log(anotherSizeProd);

    if (anotherSizeProd) {
      setTimeout(() => {
        navigate(
          `/catalog/${anotherSizeProd.subcategory}/${anotherSizeProd.id}`
        );
        setProductDetailsLoading(false);
      }, 1000);
    } else {
      return;
    }

    console.log("anotherSizeProd", anotherSizeProd);
  };

  const handleSizeChoise = (selectedSize: string) => {
    if (selectedProduct === null) return;
    handleSetAnotherVyshyvankaBySize(selectedProduct.title, selectedSize);
  };

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
                selectedValue={selectedProduct.size}
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
