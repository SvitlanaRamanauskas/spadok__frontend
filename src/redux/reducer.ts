import { combineReducers } from "redux";
import cartReducer from './cart/reducerCart';

export const rootReducer = combineReducers({ cart: cartReducer });

export default rootReducer;