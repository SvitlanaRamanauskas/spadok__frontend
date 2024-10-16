import "./ImageModal.scss";

type Props = {
  images: string[];
  currentImageIndex: number | null;
  onClose: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const ImageModal: React.FC<Props> = ({
  images,
  currentImageIndex,
  onClose,
  handleNext,
  handlePrevious,
}) => {
  if (currentImageIndex === null) return null;

  return (
    <div className="image-modal">
      <button className="image-modal__close" onClick={onClose}>
      <img
          src={
            require("../../styles/icons/Close.svg")
              .default
          }
          alt="arrow-right"
          className="image-modal__arrow"
        />
      </button>

      <button className="image-modal__prev" onClick={handlePrevious}>
        <img
          src={
            require("../../styles/icons/Chevron-Arrow-Right--disabled.svg")
              .default
          }
          alt="arrow-left"
          className="image-modal__arrow image-modal__arrow--left"
        />
      </button>

      <button className="image-modal__next" onClick={handleNext}>
        <img
          src={
            require("../../styles/icons/Chevron-Arrow-Right--disabled.svg")
              .default
          }
          alt="arrow-right"
          className="image-modal__arrow image-modal__arrow--right"
        />
      </button>

      <div className="image-modal__overlay" onClick={onClose}></div>

      <div className="image-modal__content">
        <img
          src={images[currentImageIndex]}
          alt="fullscreen"
          className="image-modal__img"
        />
      </div>
    </div>
  );
};
