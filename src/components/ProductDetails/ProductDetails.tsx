import classNames from "classnames";
import cn from "classnames";
import '../../styles/Heart.scss';
import React, {
  useContext,
  useRef,
  useState,
} from "react";
import { AppContext } from "../appContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.scss";
import "../../styles/button.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addItem as addItemToCart,
  cartSelector,
} from "../../redux/cart/reducerCart";


import { Loader } from "../Loader";
import { DetailsImages } from "./DetailsImages";
import { addedToCart, isVyshyvanka } from "../../helper/productUtils";
import { Sizes } from "./Sizes";
import { useProductDetails } from "../../helper/hooks/useProductDetails";
import { DynamicProduct } from "../../types/Product";
import { Vyshyvanka } from "../../types/Vyshyvanka";

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  const location = useLocation();
  const { selectedProduct } = useContext(AppContext);
  const categoryPath = location.pathname.split("/")[2];
  const { productDetailsLoading, setProductDetailsLoading,  productNotFound, productFetchError, productsFromServer } = useProductDetails(
    productId!
  );
  const [selectedChapter, setSelectedChapter] = useState("characteristics");
  const cartItems = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const sizesRef = useRef<HTMLDivElement | null>(null);
  const handleAddToCart = (product: DynamicProduct) => {
    dispatch(addItemToCart(product));
  };
  const navigate = useNavigate();
  const goBack = () => {
    const lastIndexOfSlash = location.pathname.lastIndexOf("/");
    const newPath = location.pathname.slice(0, lastIndexOfSlash);
    navigate(newPath);
  };

  const vyshyvankyFromServer = productsFromServer.filter(prod => prod.category === "vyshyvanky") as Vyshyvanka[];

  console.log('curentImage');

  return (
    <>
      {!productDetailsLoading &&
        !productNotFound &&
        selectedProduct !== null && (
          <div className="details">

            <div className="details__container">
              <div className="details__img-inf-wrapper">
                <DetailsImages />
                
                <div ref={sizesRef} className="details__info info">
                  <div className="back details__back">
                    <img
                      src={require("../../styles/icons/arrow-back.svg").default}
                      alt="arrow"
                      className="back__arrow"
                      onClick={goBack}
                    />
                    <button
                      type="button"
                      className="info__name"
                      onClick={goBack}
                      data-cy="backButton"
                    >
                      Повернутися
                    </button>
                  </div>
                  <h3 className="info__title">
                    {selectedProduct.title}
                  </h3>
                  <p className="info__price">
                    {" "}
                    &#x20b4; {selectedProduct.price}
                  </p>

                  {selectedProduct !== 
                  null && isVyshyvanka(selectedProduct) && (
                    <Sizes
                      setProductDetailsLoading={setProductDetailsLoading}
                      vyshyvankyFromServer={vyshyvankyFromServer}
                    />
                  )}

                  <div className="description description--desktop">
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
                          "description__title--active":
                            selectedChapter === "care",
                        })}
                      >
                        Особливості догляду
                      </button>
                      <button
                        onClick={() => setSelectedChapter("size-table")}
                        className={classNames("description__title", {
                          "description__title--active":
                            selectedChapter === "size-table",
                        })}
                      >
                        Розмірна сітка
                      </button>
                    </div>

                    {selectedChapter === "characteristics" && (
                      <p className="description__body">
                        {selectedProduct.description
                          .split("\n")
                          .map((line, index) => (
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

                    <button
                      type="button"
                      className={cn("button", "description__button", {
                        "description__button--prod-added":
                          selectedProduct &&
                          addedToCart(cartItems, selectedProduct.id),
                      })}
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                      }}
                      disabled={
                        selectedProduct &&
                        addedToCart(cartItems, selectedProduct.id)
                      }
                    >
                      {`${selectedProduct && addedToCart(cartItems, selectedProduct.id) ? "Додано до кошика" : "Додати до кошика"}`}
                    </button>
                  </div>
                </div>
              </div>

              <div className="description description--mobile">
                <div className="description__buttons-titles">
                  <button
                    onClick={() => setSelectedChapter("characteristics")}
                    className="description__title"
                  >
                    Опис
                  </button>
                  <button
                    onClick={() => setSelectedChapter("care")}
                    className="description__title"
                  >
                    Особливості догляду
                  </button>

                  <button
                    onClick={() => setSelectedChapter("size-table")}
                    className="description__title"
                  >
                    Розмірна сітка
                  </button>
                </div>

                {selectedChapter === "characteristics" && (
                  <p className="description__body">
                    {selectedProduct.description
                      .split("\n")
                      .map((line, index) => (
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

                <p className="info__name info__name--warn">
                  Переконайтеся, що Ви обрали вірний розмір, будь ласка
                </p>
                <div className="description__button-wrapper">
                  <button
                    type="button"
                    className={cn("button", "description__button", {
                      "description__button--prod-added":
                        selectedProduct &&
                        addedToCart(cartItems, selectedProduct.id),
                    })}
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                    }}
                    disabled={
                      selectedProduct &&
                      addedToCart(cartItems, selectedProduct.id)
                    }
                  >
                    {`${selectedProduct && addedToCart(cartItems, selectedProduct.id) ? "Додано до кошика" : "Додати до кошика"}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {productDetailsLoading &&
        !productNotFound &&
        selectedProduct !== null && <Loader />}

      {!productDetailsLoading &&
        productNotFound &&
        selectedProduct === null && (
          <div className="details__not-found">Товар не знайдено</div>
        )}

      {!productDetailsLoading && productFetchError && (
        <div className="details__not-found">
          Сталася помилка, неможливо завантажити сторінку.
        </div>
      )}
    </>
  );
};
