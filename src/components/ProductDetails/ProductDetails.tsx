import classNames from "classnames";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext";
import { useLocation, useParams } from "react-router-dom";
import { getProductDetails } from "../../helper/fetch";
import "./ProductDetails.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addItem as addItemToCart,
  cartSelector,
} from "../../redux/cart/reducerCart";
import {
  addItem as addItemToFavorites,
  favoritesSelector,
  removeItem,
} from "../../redux/cart/reducerFavorites";
import { FavoritesItem } from "../../types/FavoritesItem";
import { CartItem } from "../../types/CartItem";

export const ProductDetails: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(AppContext);

  const [activeSize, setActiveSize] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const cartItems = useAppSelector(cartSelector);
  const favoritesItems = useAppSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: VyshyvankaDetails) => {
    dispatch(addItemToCart(product));
  };

  const addedToFavorites = (itemsInFavorites: FavoritesItem[], id: string) => {
    return itemsInFavorites.some((item) => item.item.id === id);
  };

  const addedToCart = (cartItemsAdded: CartItem[], itemId: string) => {
    return cartItemsAdded.some((itemInCart) => itemInCart.item.id === itemId);
  };

  const handleAddToFavorites = (product: VyshyvankaDetails) => {
    if (addedToFavorites(favoritesItems, product.id)) {
      dispatch(removeItem(product));
    } else {
      dispatch(addItemToFavorites(product));
    }
  };

  const location = useLocation();
  const productCategory = location.pathname.slice(
    1,
    location.pathname.indexOf("/", 1)
  );

  const { productId } = useParams<{ productId?: string }>();
  console.log(productCategory);

  useEffect(() => {
    setProductNotFound(false);
    setProductDetailsLoading(true);

    if (productId) {
      setTimeout(() => {
        getProductDetails(productId, productCategory)
          .then((productData) => {
            if (productData !== null && Array.isArray(productData.images)) {
              setSelectedProduct(productData);
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
      }, 1000);
    }
  }, [productId, productCategory]);

  const handleImageClick = (clickedImage: string) => {
    setCurrentImage(clickedImage);
  };

  const handleSizeClick = (clickedSize: string) => {
    setActiveSize(clickedSize);
  };

  const handleSetAnotherProductBySize = (
    currentProductId: string,
    anotherSize: string
  ) => {
    setProductDetailsLoading(true);
  };

  return (
    <>
      {!productDetailsLoading &&
        !productNotFound &&
        selectedProduct !== null && (
          <div className="details">
            <div className="details__container">
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
                    className={classNames('details__icon-bg', {
                      'details__icon-bg--active' : selectedProduct 
                       && addedToFavorites(favoritesItems, selectedProduct?.id)
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

                <div className="details__small-images">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      className={classNames("details__image", {
                        "details__image--active": currentImage === image,
                      })}
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
              </div>

              <div className="details__info info">
                <h3 className="info__title">{selectedProduct.name}</h3>
                <p className="info__price">{selectedProduct.price}</p>
                <div className="info__size size">
                  <p className="size__title">Size</p>

                  <div className="size__elements">
                    {selectedProduct.sizesAvailable.map((size) => (
                      <button
                        type="button"
                        onClick={() => {
                          handleSizeClick(size);
                          handleSetAnotherProductBySize(
                            selectedProduct?.id,
                            size
                          );
                        }}
                        className={classNames("size__box", {
                          "size__box--active": activeSize === size,
                        })}
                        key={size}
                        aria-label={`Select ${size} size`}
                      >
                        <div
                          className={`
                              size__value
                              size__value--${size}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="info__description">
                  <p className="info__description-title">Опис</p>
                  <p className="info__description-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos omnis eligendi odit ab, eum a suscipit nam, voluptas ea
                    blanditiis unde quasi laudantium minima aut corporis
                    excepturi accusamus deleniti modi facere possimus magnam
                    doloremque tempore ipsam quia? Illo, tempora sit. Eum ut
                    architecto tempore, dicta impedit nihil praesentium facere
                    perspiciatis.
                  </p>
                </div>

                <button
                  type="button"
                  className="info__button"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                  }}
                >
                  {`${selectedProduct && addedToCart(cartItems, selectedProduct.id) ? 'Додано до кошика' : 'Додати до кошика'}`}
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
