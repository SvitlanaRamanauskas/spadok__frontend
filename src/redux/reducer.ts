import { combineReducers } from "redux";
import cartReducer from './cart/reducerCart';
import favoritesReducer from './cart/reducerFavorites';

export const rootReducer = combineReducers({ 
    cart: cartReducer,
    favorites: favoritesReducer
});

export default rootReducer;