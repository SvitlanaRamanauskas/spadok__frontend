import "./PhotoSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import directly from 'swiper'
import "swiper/swiper-bundle.css";
import { useEffect, useState } from "react";

export const PhotoSlider = () => {

  const [visibleImages, setVisibleImages] = useState<number[]>([0, 1, 2, 3]);

  const images = [
    { url: "/img/45.jpg" },
    { url: "/img/46.jpg" },
    { url: "/img/47.jpg" },
    { url: "/img/48.jpg" },
    { url: "/img/49.jpg" },
    { url: "/img/50.jpg" },
    { url: "/img/51.jpg" },
    { url: "/img/52.jpg" },
    { url: "/img/53.jpg" },
    { url: "/img/54.jpg" },
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
