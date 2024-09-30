import classNames from "classnames";
import cn from "classnames";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchVyshyvanky, getProductDetails } from "../../helper/fetch";
import "./ProductDetails.scss";
import "../../styles/button.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addItem as addItemToCart,
  cartSelector,
} from "../../redux/cart/reducerCart";
import {
  addItemToFavorites,
  favoritesSelector,
  removeItemFromFavorites,
} from "../../redux/cart/reducerFavorites";
import { FavoritesItem } from "../../types/FavoritesItem";
import { CartItem } from "../../types/CartItem";
import { Loader } from "../Loader";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import { BookDetails } from "../../types/BookDetails";

export const ProductDetails: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(AppContext);
  const [vyshyvanky, setVyshyvanky] = useState<Vyshyvanka[]>([]);

  const [activeSize, setActiveSize] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("characteristics");

  const cartItems = useAppSelector(cartSelector);
  const favoritesItems = useAppSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: VyshyvankaDetails | BookDetails) => {
    dispatch(addItemToCart(product));
  };

  const addedToFavorites = (itemsInFavorites: FavoritesItem[], id: string) => {
    return itemsInFavorites.some((item) => item.item.id === id);
  };

  const addedToCart = (cartItemsAdded: CartItem[], itemId: string) => {
    return cartItemsAdded.some((itemInCart) => itemInCart.item.id === itemId);
  };

  const handleAddToFavorites = (product: VyshyvankaDetails | BookDetails) => {
    if (addedToFavorites(favoritesItems, product.id)) {
      dispatch(removeItemFromFavorites(product));
    } else {
      dispatch(addItemToFavorites(product));
    }
  };

  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const category = pathArr[2];

  const { productId } = useParams<{ productId?: string }>();

  useEffect(() => {
    setProductNotFound(false);
    setProductDetailsLoading(true);

    if (productId) {
      getProductDetails(productId, category)
        .then((productData) => {
          if (productData !== null) {
            setSelectedProduct(productData);

            if ("size" in productData) {
              setActiveSize(productData.size);
            }

            setCurrentImage(
              productData.images.length > 0 ? productData.images[0] : ""
            );
          } else {
            setProductNotFound(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          setProductNotFound(true);
        })
        .finally(() => {
          setProductDetailsLoading(false);
        });
    }

    fetchVyshyvanky().then((fetchedProducts) => setVyshyvanky(fetchedProducts));
  }, [productId]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleImageClick = (clickedImage: string) => {
    setCurrentImage(clickedImage);
  };

  const handleSizeClick = (clickedSize: string) => {
    setActiveSize(clickedSize);
  };

  const handleSetAnotherProductBySize = (
    currentProdName: string,
    clickedSize: string
  ) => {
    setProductDetailsLoading(true);
    const anotherSizeProd = vyshyvanky.find(
      (vyshyvanka) =>
        vyshyvanka.name === currentProdName && vyshyvanka.size === clickedSize
    );
    if (anotherSizeProd !== undefined) {
      setTimeout(() => {
        getProductDetails(anotherSizeProd?.id, anotherSizeProd?.category).then(
          (prodData) => {
            if (prodData) {
              setSelectedProduct(prodData);

              setCurrentImage(
                prodData.images.length > 0 ? prodData.images[0] : ""
              );

              navigate(
                `/catalog/${anotherSizeProd?.category}/${anotherSizeProd?.id}`
              );
            } else {
              setProductNotFound(true);
            }
          }
        );
        setProductDetailsLoading(false);
        console.log(selectedProduct);
      }, 1000);
    }
  };

  const selectedProductNameOrTitle = (
    selectedProduct: VyshyvankaDetails | BookDetails
  ) => {
    if (selectedProduct) {
      return "name" in selectedProduct
        ? selectedProduct.name
        : selectedProduct?.title;
    }
  };

  return (
    <>
      {!productDetailsLoading &&
        !productNotFound &&
        selectedProduct !== null && (
          <div className="details">
            <div className="details__container">
              <div className="details__img-inf-wrapper">
                <div className="details__images-wrapper">
                  <div className="details__main-image-container">
                    <div className="details__main-image">
                      <img
                        src={currentImage}
                        alt="product"
                        className="details__picture"
                      />
                    </div>
                    <button
                      type="button"
                      className={classNames("details__icon-bg", {
                        "details__icon-bg--active":
                          selectedProduct &&
                          addedToFavorites(favoritesItems, selectedProduct?.id),
                      })}
                      onClick={() => handleAddToFavorites(selectedProduct)}
                    >
                      <img
                        src={
                          require("../../styles/icons/Favourites-Heart-Like.svg")
                            .default
                        }
                        alt=""
                        className="details__icon details__icon--favorites"
                      />
                    </button>
                  </div>
                  {selectedProduct.images.map((image, index) => (
                    <button
                      className={classNames(
                        "details__image-button",
                        `details__image-button--${index + 1}`,
                        {
                          "details__image--active": currentImage === image,
                        }
                      )}
                      type="button"
                      onClick={() => handleImageClick(image)}
                      key={image}
                    >
                      <img
                        src={selectedProduct.images[index]}
                        alt={`item ${index}`}
                        className="details__picture"
                      />
                    </button>
                  ))}
                </div>
                <div className="details__info info">
                  <div className="back details__back">
                    <img
                      src={require("../../styles/icons/arrow-back.svg").default}
                      alt="arrow"
                      className="back__arrow"
                      onClick={goBack}
                    />
                    <button
                      type="button"
                      className="back__button"
                      onClick={goBack}
                      data-cy="backButton"
                    >
                      Повернутися
                    </button>
                  </div>
                  <h3 className="info__title">
                    {selectedProductNameOrTitle(selectedProduct)}
                  </h3>
                  <p className="info__price">
                    {" "}
                    &#x20b4; {selectedProduct.price}
                  </p>

                  {"size" in selectedProduct && (
                    <div className="info__size size">
                      <p className="size__title">Розмір</p>
                      <div className="size__elements">
                        {selectedProduct.sizesAvailable.map((size) => (
                          <button
                            type="button"
                            onClick={() => {
                              handleSizeClick(size);
                              handleSetAnotherProductBySize(
                                selectedProduct?.name,
                                size
                              );
                            }}
                            className={classNames("size__box", {
                              "size__box--active": activeSize === size,
                            })}
                            key={size}
                            aria-label={`Select ${size} size`}
                          >
                            <p
                              className={classNames(
                                "size__value",
                                `size__value--${size}`,
                                {
                                  "size__value--active": activeSize === size,
                                }
                              )}
                            >
                              {size}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
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
    </>
  );
};
