import { useContext, useState } from "react";
import "./ImageModal.scss";
import { AppContext } from "../../appContext";
import { DynamicProduct } from "../../../types/Product";

type Props = {
  images: string[];
  onClose: () => void;
};

export const ImageModal: React.FC<Props> = ({ images, onClose }) => {
  const { selectedProduct } = useContext(AppContext) as {
    selectedProduct: DynamicProduct;
  };
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex! + 1) % selectedProduct.images.length
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex! - 1
    );
  };

  console.log("images", images, selectedProduct);

  return (
    <div className="image-modal">
      <button className="image-modal__close" onClick={onClose}>
        <img
          src={require("../../../styles/icons/Close.svg").default}
          alt="arrow-right"
          className="image-modal__arrow"
        />
      </button>

      {images.length > 1 && (
        <>
          <button className="image-modal__prev" onClick={handlePrevious}>
            <img
              src={
                require("../../../styles/icons/Chevron-Arrow-Right--disabled.svg")
                  .default
              }
              alt="arrow-left"
              className="image-modal__arrow image-modal__arrow--left"
            />
          </button>

          <button className="image-modal__next" onClick={handleNext}>
            <img
              src={
                require("../../../styles/icons/Chevron-Arrow-Right--disabled.svg")
                  .default
              }
              alt="arrow-right"
              className="image-modal__arrow image-modal__arrow--right"
            />
          </button>
        </>
      )}

      <div className="image-modal__overlay" onClick={onClose}></div>

      <div className="image-modal__content">
        <img
          src={`${process.env.PUBLIC_URL}/${images[currentImageIndex]}`}
          alt="fullscreen"
          className="image-modal__img"
        />
      </div>
    </div>
  );
};
