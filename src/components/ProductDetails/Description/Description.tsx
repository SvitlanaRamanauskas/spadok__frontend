import React, { useCallback, useContext, useState } from "react";
import classNames from "classnames";
import { AppContext } from "../../appContext";
import "./Description.scss";
import "../ProductDetails.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { DynamicProduct } from "../../../types/Product";
import {
  addItem as addItemToCart,
  cartSelector,
} from "../../../redux/cart/reducerCart";
import { addedToCart } from "../../../helper/productUtils";
import { ImageModal } from "../ImageModal";


export const Description: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState("characteristics");
  const { selectedProduct } = useContext(AppContext);
  const [sizeTableModalOpen, setSizeTableModalOpen] = useState(false);
  const cartItems = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: DynamicProduct) => {
    dispatch(addItemToCart(product));
  };

  const handleSizeTableModelClose = useCallback(() => {
    setSizeTableModalOpen(false);
  }, [])

  return (
    <>
      {selectedProduct !== null && (
        <>
          <div className="description__buttons-titles">
            <button
              onClick={() => setSelectedChapter("characteristics")}
              className={classNames("description__title", {
                "description__title--active":
                  selectedChapter === "characteristics",
              })}
            >
              Опис
            </button>

            <button
              onClick={() => setSelectedChapter("care")}
              className={classNames("description__title", {
                "description__title--active": selectedChapter === "care",
              })}
            >
              Особливості догляду
            </button>

            <button
              onClick={() => setSelectedChapter("size-table")}
              className={classNames("description__title", {
                "description__title--active": selectedChapter === "size-table",
              })}
            >
              Розмірна сітка
            </button>
          </div>

          {selectedChapter === "characteristics" && (
            <p className="description__body">
              {selectedProduct.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}

          {selectedChapter === "care" && (
            <p className="description__body">
              {
                "Прання - машинне автомат або ручне не більше 40 градусів. Нитки - водостійкі, DCM Муліне. Прасування - найкраще: після прання, ще трохи вологу сорочку попрасувати і вивісити."
              }
            </p>
          )}

          {selectedChapter === "size-table" && (
            <button onClick={() => setSizeTableModalOpen(true)} className="description__button">
              <img
                src={selectedProduct.subcategory === "boys" 
                  || selectedProduct.subcategory === "girls"
                  ? `${process.env.PUBLIC_URL}/img/kidsSizes.jpg` 
                  : `${process.env.PUBLIC_URL}/img/kidsSizes.jpg`}
                alt="kids sizes"
                className="description__body--size-table"
              />
            </button>
          )}

          {sizeTableModalOpen && (
            <ImageModal
              images={["/img/kidsSizes.jpg"]}
              onClose={handleSizeTableModelClose}
            />
          )}

          <p className="info__name info__name--warn">
            Переконайтеся, що Ви обрали вірний розмір, будь ласка
          </p>

          <div className="description__button-wrapper">
            <button
              type="button"
              className={classNames("button", "description__button", {
                "description__button--prod-added":
                  selectedProduct && addedToCart(cartItems, selectedProduct.id),
              })}
              onClick={() => {
                handleAddToCart(selectedProduct);
              }}
              disabled={
                selectedProduct && addedToCart(cartItems, selectedProduct.id)
              }
            >
              {`${selectedProduct && addedToCart(cartItems, selectedProduct.id) ? "Додано до кошика" : "Додати до кошика"}`}
            </button>
          </div>
        </>
      )}
    </>
  );
};
