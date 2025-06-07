import "../../styles/Heart.scss";
import React, { useContext, useRef } from "react";
import { AppContext } from "../appContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.scss";
import "../../styles/button.scss";

import { Loader } from "../Loader";
import { DetailsImages } from "./DetailsImages";
import { Sizes } from "./Sizes";
import { useProductDetails } from "../../helper/hooks/useProductDetails";
import { VyshyvankaUI } from "../../types/Vyshyvanka";
import { Description } from "./Description/Description";
import { transformToProductUI } from "../../helper/transformToProdIU";
import { addedToCart } from "../../helper/productUtils";
import { QuantitySetter } from "../QuantitySetter";
import { useAppSelector } from "../../redux/hooks";
import { cartSelector } from "../../redux/cart/reducerCart";
import { DynamicProduct } from "../../types/Product";
import { CartItem } from "../../types/CartItem";

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  const location = useLocation();
  const { selectedProduct } = useContext(AppContext);
  const numericProductId = productId ? Number(productId) : undefined;
  const cartItems = useAppSelector(cartSelector);

  const getCartItem = (currentItem: DynamicProduct): CartItem | undefined => {
    return cartItems.find((item) => item.item.id === currentItem.id) || undefined;
  }
    

  const {
    productDetailsLoading,
    setProductDetailsLoading,
    setProductNotFound,
    productNotFound,
    productFetchError,
    productsFromServer,
  } = useProductDetails(numericProductId!);

  const sizesRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const goBack = () => {
    const lastIndexOfSlash = location.pathname.lastIndexOf("/");
    const newPath = location.pathname.slice(0, lastIndexOfSlash);
    navigate(newPath);
  };

  const vyshyvankyFromServer: VyshyvankaUI[] = productsFromServer
    .map(transformToProductUI)
    .filter((prod) => {
      return prod.category === "vyshyvanky";
    }) as VyshyvankaUI[];

  console.log("ProductDetails");

  const cartItem = selectedProduct ? getCartItem(selectedProduct) : undefined;

  return (
    <>
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
                  <h3 className="info__title">{selectedProduct.title}</h3>
                  <p className="info__price">
                    {" "}
                    &#x20b4; {selectedProduct.price}
                  </p>

                  {selectedProduct !== null && selectedProduct.size && (
                    <>
                      <p className="info__name">Розмір:</p>

                      <Sizes
                        setProductDetailsLoading={setProductDetailsLoading}
                        vyshyvankyFromServer={vyshyvankyFromServer}
                        setProductNotFound={setProductNotFound}
                      />
                    </>
                  )}

                  {addedToCart(cartItems, selectedProduct.id) && cartItem &&(
                    <QuantitySetter item={cartItem} />
                  )}

                  <div className="details__description--desktop">
                    <Description />
                  </div>
                </div>
              </div>

              <div className="details__description--mobile">
                <Description />
              </div>
            </div>
          </div>
        )}
    </>
  );
};
