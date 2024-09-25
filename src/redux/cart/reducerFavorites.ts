import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FavoritesItem } from "../../types/FavoritesItem";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import { BookDetails } from "../../types/BookDetails";

const saveFavoritesToLocalStorage = (state: FavoritesState) => {
    localStorage.setItem("favoritesItems", JSON.stringify(state.favoritesItems));
    localStorage.setItem("totalFavoritesQuantity", JSON.stringify(state.totalFavoritesQuantity));
};

const loadFavoritesFromLocalStorage = (): FavoritesState => {
    const favoritesItems = localStorage.getItem("favoritesItems");
    const totalFavoritesQuantity = localStorage.getItem("totalFavoritesQuantity");

    return {
        favoritesItems: favoritesItems ? JSON.parse(favoritesItems) : [],
        totalFavoritesQuantity: totalFavoritesQuantity ? JSON.parse(totalFavoritesQuantity) : 0,
    };
};

interface FavoritesState {
    favoritesItems: FavoritesItem[];
    totalFavoritesQuantity: number;
}

export const initialState: FavoritesState = loadFavoritesFromLocalStorage();

export const favoritesSelector = (state: RootState) => state.favorites.favoritesItems;
export const totalFavoritesQuantitySelector = (state: RootState) => state.favorites.totalFavoritesQuantity;

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<VyshyvankaDetails | BookDetails>) => {
            const newItem = action.payload;
            const existingItem = state.favoritesItems.find(item => item.item.id === newItem.id);
            state.totalFavoritesQuantity += 1;
            if (!existingItem) {
                state.favoritesItems.push({
                    item: newItem,
                    id: state.favoritesItems.length + 1,
                });
            }

            saveFavoritesToLocalStorage(state);
        },

        removeItem: (state, action: PayloadAction<VyshyvankaDetails | BookDetails>) => {
            const itemToDelete = action.payload;
            const existingItem = state.favoritesItems.find(item => item.item.id === itemToDelete.id);
            console.log(state.favoritesItems)
            if (existingItem) {
                state.totalFavoritesQuantity -= 1;
                state.favoritesItems = state.favoritesItems.filter(item => item.item.id !== itemToDelete.id);
            }
            console.log(existingItem, itemToDelete)

            saveFavoritesToLocalStorage(state);
        }
    }
});

export const { addItem, removeItem } = favoritesSlice.actions;

export default favoritesSlice.reducer;



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
