import classNames from "classnames";
import "../../../styles/Heart.scss";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../appContext";
import { ImageModal } from "../ImageModal";
import { addedToFavorites } from "../../../helper/productUtils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addItemToFavorites,
  favoritesSelector,
  removeItemFromFavorites,
} from "../../../redux/cart/reducerFavorites";
import { DynamicProduct } from "../../../types/Product";

export const DetailsImages: React.FC = () => {
  const { selectedProduct } = useContext(AppContext) as {
    selectedProduct: DynamicProduct;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favoritesItems = useAppSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const handleAddToFavorites = (product: DynamicProduct) => {
    if (addedToFavorites(favoritesItems, product.id)) {
      dispatch(removeItemFromFavorites(product));
    } else {
      dispatch(addItemToFavorites(product));
    }
  };

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {isModalOpen && (
        <ImageModal
          images={selectedProduct.images}
          onClose={handleCloseModal}
        />
      )}

      <div className="details__images-wrapper">
        <div className="details__main-image-container">
          <div className="details__main-image">
            <img
              src={`${process.env.PUBLIC_URL}/${selectedProduct.images[0]}`}
              alt="product"
              className="details__picture"
              onClick={handleOpenModal}
            />
          </div>

          <button
            type="button"
            className={classNames("heart__icon-bg", "details__icon-bg", {
              "details__icon-bg--active":
                selectedProduct &&
                addedToFavorites(favoritesItems, selectedProduct?.id),
            })}
            onClick={() => handleAddToFavorites(selectedProduct)}
          >
            {addedToFavorites(favoritesItems, selectedProduct?.id) ? (
              <img
                src={
                  require("../../../styles/icons/red_heart_icon.svg").default
                }
                alt=""
                className="heart__icon details__icon"
              />
            ) : (
              <img
                src={
                  require("../../../styles/icons/Favourites-Heart-Like.svg")
                    .default
                }
                alt=""
                className="heart__icon details__icon"
              />
            )}
          </button>
        </div>

        {selectedProduct.images.map((image, index) => (
          <button
            className="details__image-button"
            type="button"
            onClick={handleOpenModal}
            key={image}
          >
            <img
              src={`${process.env.PUBLIC_URL}/${selectedProduct.images[index]}`}
              alt={`item ${index}`}
              className="details__picture"
            />
          </button>
        ))}
      </div>
    </>
  );
};
