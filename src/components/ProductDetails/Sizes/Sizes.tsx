import { useContext } from "react";
import { AppContext } from "../../appContext";
import "./Sizes.scss";
import classNames from "classnames";
import { isForAdults, isForKids, isVyshyvanka } from "../../../helper/productUtils";
import { useNavigate } from "react-router-dom";
import { Vyshyvanka } from "../../../types/Vyshyvanka";
import { Dropdown } from "../../Dropdown";

type Props = {
  setProductDetailsLoading: (value: boolean) => void;
  vyshyvankyFromServer: Vyshyvanka[];
};

export const Sizes: React.FC<Props> = ({
  setProductDetailsLoading,
  vyshyvankyFromServer,
}) => {
  const { selectedProduct } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSetAnotherVyshyvankaBySize = (
    currentProdTitle: string,
    clickedSize: string
  ) => {
    setProductDetailsLoading(true);

    const anotherSizeProd = vyshyvankyFromServer.find(
      (vyshyvanka) =>
        vyshyvanka.title === currentProdTitle && vyshyvanka.size === clickedSize
    );

    if (anotherSizeProd) {
      setTimeout(() => {
        navigate(`/catalog/${anotherSizeProd.category}/${anotherSizeProd.id}`);
        setProductDetailsLoading(false);
      }, 1000);
    }
  };
  console.log("here", isForAdults(selectedProduct as Vyshyvanka) )

  const handleSizeChoise = (selectedSize: string) => {
    if(selectedProduct === null) return;
    handleSetAnotherVyshyvankaBySize(
      selectedProduct.title,
      selectedSize
  )};

  return (
    <>
      {selectedProduct !== null && isVyshyvanka(selectedProduct as Vyshyvanka) && (
        <>
          {isForKids(selectedProduct) && 
              <div className="size">
                <Dropdown 
                  options={selectedProduct.sizesAvailable}
                  dropdownName={"Обрати розмір"}
                  onChoise={handleSizeChoise}
                />
              </div>
          } 

          {isForAdults(selectedProduct) && 
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
          }

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
