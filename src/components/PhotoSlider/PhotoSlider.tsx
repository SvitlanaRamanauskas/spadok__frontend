import "./PhotoSlider.scss";
import { useEffect, useState } from "react";

export const PhotoSlider = () => {

  const [visibleImages, setVisibleImages] = useState<number[]>([0, 1, 2, 3]);

  const images = [
    { url: "/img/45.png" },
    { url: "/img/46.png" },
    { url: "/img/47.png" },
    { url: "/img/48.png" },
    { url: "/img/49.png" },
    { url: "/img/50.png" },
    { url: "/img/51.png" },
    { url: "/img/52.png" },
    { url: "/img/53.png" },
    { url: "/img/54.png" },
  ];
  const totalImages = images.length;
  useEffect(() => {    
    const changePictures = () => {
      const screenWidth = window.innerWidth;
      const numVisible = screenWidth >= 1200 ? 4 : screenWidth >= 768 ? 3 : 2;

      setVisibleImages((prevVisibleImages) => {
        const nextStartIndex = (prevVisibleImages[0] + numVisible) % totalImages;
        const newVisibleImages = [];
        for (let i = 0; i < numVisible; i++) {
          newVisibleImages.push((nextStartIndex + i) % totalImages);
        }
        return newVisibleImages;
      });
    };

      const interval = setInterval(changePictures, 3000);

      return () => clearInterval(interval);

  }, [totalImages]);

  return (
    <div className="slider__content">
      <ul className="slider__images">
        {images.map((image, index) => (
          <li className={`slider__image ${visibleImages.includes(index) ? 'slider__image--visible' : 'slider__image--hidden'}`} key={image.url}>
            <img src={image.url} alt="pict" className="slider__image-img" />
          </li>
        ))}
      </ul>
    </div>
  );
};
