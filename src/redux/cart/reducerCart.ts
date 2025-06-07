import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";
import { RootState } from "../store";
import { DynamicProduct } from "../../types/Product";

const saveCartToLocalStorage = (state: CartState) => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    localStorage.setItem("totalCartQuantity", JSON.stringify(state.totalCartQuantity));
    localStorage.setItem("totalCartPrice", JSON.stringify(state.totalCartPrice));
};

const loadCartFromLocalStorage = (): CartState => {
    const cartItems = localStorage.getItem("cartItems");
    const totalCartQuantity = localStorage.getItem("totalCartQuantity");
    const totalCartPrice = localStorage.getItem("totalCartPrice");

    return {
        cartItems: cartItems ? JSON.parse(cartItems) : [],
        totalCartQuantity: totalCartQuantity ? JSON.parse(totalCartQuantity) : 0,
        totalCartPrice: totalCartPrice ? JSON.parse(totalCartPrice) : 0,
    };
};

interface CartState {
    cartItems: CartItem[];
    totalCartQuantity: number;
    totalCartPrice: number;
}

export const initialState: CartState =  loadCartFromLocalStorage();

export const cartSelector = (state: RootState) => state.cart.cartItems;
export const totalCartQuantitySelector = (state: RootState) => state.cart.totalCartQuantity;
export const totalCartPriceSelector = (state: RootState) => state.cart.totalCartPrice;

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<DynamicProduct>) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.item.id === newItem.id);
            state.totalCartQuantity += 1;
            if (!existingItem) {
                state.cartItems.push({
                    item: newItem,
                    id: state.cartItems.length + 1,
                    quantity: 1,
                });
                state.totalCartPrice += +newItem.price;
            } else {
                state.totalCartPrice += +existingItem.item.price;
                existingItem.quantity +=1;
            }

            saveCartToLocalStorage(state);
            
        },

        removeItem: (state, action: PayloadAction<DynamicProduct>) => {
            const itemToDelete = action.payload;
            const existingItem = state.cartItems.find(item => item.item.id === itemToDelete.id);

            if (existingItem) {
                state.totalCartQuantity -= 1;
                state.totalCartPrice -= existingItem.item.price;
    
                state.cartItems = state.cartItems.filter(item => item.item.id !== itemToDelete.id);
            }

            saveCartToLocalStorage(state);
            // localStorage.clear();
        },

        plusItem: (state, action: PayloadAction<DynamicProduct>) => {
            const itemToPlus = action.payload;
            const existingItem = state.cartItems.find(item => item.item.id === itemToPlus.id);

            if (existingItem) {
                state.totalCartQuantity += 1;
                state.totalCartPrice += +existingItem.item.price;
                existingItem.quantity +=1;
            }
        },

        minusItem: (state, action: PayloadAction<DynamicProduct>) => {
            const itemToMinus = action.payload;
            const existingItem = state.cartItems.find(item => item.item.id === itemToMinus.id);

            if (existingItem && existingItem.quantity > 1) {
                state.totalCartQuantity -= 1;
                existingItem.quantity -=1;
                state.totalCartPrice -= +existingItem?.item.price;
            }
        }

    }
});

export const { addItem, removeItem, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// export interface CartState {
//   items: CartItem[];
//   totalQuantity: number;
//   totalAmount: number;
// }

// const initialState: CartState = {
//   items: [],
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// // Thunks for async actions
// export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
//   const response = await axios.get('/api/cart');
//   return response.data;
// });

// export const addItem = createAsyncThunk(
//   'cart/addItem',
//   async (item: CartItem, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/api/cart', item);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const removeItem = createAsyncThunk(
//   'cart/removeItem',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await axios.delete(`/api/cart/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const updateQuantity = createAsyncThunk(
//   'cart/updateQuantity',
//   async (
//     { id, quantity }: { id: string; quantity: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.put(`/api/cart/${id}`, { quantity });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.totalQuantity = action.payload.reduce(
//           (total, item) => total + item.quantity,
//           0
//         );
//         state.totalAmount = action.payload.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         );
//       })
//       .addCase(addItem.fulfilled, (state, action) => {
//         const newItem = action.payload;
//         const existingItem = state.items.find((item) => item.id === newItem.id);
        
//         if (existingItem) {
//           existingItem.quantity += newItem.quantity;
//           existingItem.price += newItem.price * newItem.quantity;
//         } else {
//           state.items.push(newItem);
//         }

//         state.totalQuantity += newItem.quantity;
//         state.totalAmount += newItem.price * newItem.quantity;
//       })
//       .addCase(removeItem.fulfilled, (state, action) => {
//         const id = action.payload;
//         const existingItem = state.items.find((item) => item.id === id);

//         if (existingItem) {
//           state.totalQuantity -= existingItem.quantity;
//           state.totalAmount -= existingItem.price;
//           state.items = state.items.filter((item) => item.id !== id);
//         }
//       })
//       .addCase(updateQuantity.fulfilled, (state, action) => {
//         const updatedItem = action.payload;
//         const existingItem = state.items.find((item) => item.id === updatedItem.id);

//         if (existingItem) {
//           state.totalQuantity += updatedItem.quantity - existingItem.quantity;
//           state.totalAmount += (updatedItem.quantity - existingItem.quantity) * existingItem.price;
//           existingItem.quantity = updatedItem.quantity;
//         }
//       });
//   },
// });

// export default cartSlice.reducer;
