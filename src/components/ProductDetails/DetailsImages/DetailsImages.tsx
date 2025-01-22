import classNames from "classnames";
import "../../../styles/Heart.scss";
import { useContext, useState } from "react";
import { AppContext } from "../../appContext";
import { ImageModal } from "../ImageModal";
import { VyshyvankaDetails } from "../../../types/VyshyvankaDetails";
import { BookDetails } from "../../../types/BookDetails";
import { addedToFavorites } from "../../../helper/productUtils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addItemToFavorites, favoritesSelector, removeItemFromFavorites } from "../../../redux/cart/reducerFavorites";

type Props = {
  mainImage: string;
  setCurrentImage: (newImage: string) => void;
};

export const DetailsImages: React.FC<Props> = ({ mainImage, setCurrentImage }) => {
  const { selectedProduct } = useContext(AppContext) as {
    selectedProduct: VyshyvankaDetails | BookDetails;
  };;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<null | number>(
    null
  );

const favoritesItems = useAppSelector(favoritesSelector);
const dispatch = useAppDispatch();

  const handleAddToFavorites = (product: VyshyvankaDetails | BookDetails) => {
    if (addedToFavorites(favoritesItems, product.id)) {
      dispatch(removeItemFromFavorites(product));
    } else {
      dispatch(addItemToFavorites(product));
    }
  };

  //#region Modal

  const handleImageClick = (clickedImage: string, index: number) => {
    setCurrentImage(clickedImage);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
  };

  const handleNextImage = () => {
    if (currentImageIndex !== null && selectedProduct !== null) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex! + 1) % selectedProduct.images.length
      );
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex !== null && selectedProduct !== null) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex! - 1
      );
    }
  };

  //#endregion

  return (
    <>
      {isModalOpen && (
        <ImageModal
          images={selectedProduct.images}
          currentImageIndex={currentImageIndex}
          onClose={handleCloseModal}
          handleNext={handleNextImage}
          handlePrevious={handlePreviousImage}
        />
      )}
      <div className="details__images-wrapper">
        <div className="details__main-image-container">
          <div className="details__main-image">
            <img
              src={`${mainImage}`}
              alt="product"
              className="details__picture"
              onClick={() => handleImageClick(mainImage!, 0)}
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
                src={require("../../../styles/icons/red_heart_icon.svg").default}
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
            className={classNames(
              "details__image-button",
              // `details__image-button--${index + 1}`,
              {
                "details__image--active": mainImage === image,
              }
            )}
            type="button"
            onClick={() => handleImageClick(image, index)}
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
