import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartState } from "../types/cartType";
import type { MenuItem } from "../types/restaurantType";

export const useCartStore = create<any>()(persist((set) => ({
    cart:[],
    addToCart: (item: MenuItem, restaurantId: string) => { // ✅ thêm restaurantId
        set((state) => {
            const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
            if(existingItem) {
                return {
                    cart: state.cart.map((cartItem) =>
                        cartItem.id === item.id
                            ? {...cartItem, quantity: cartItem.quantity + 1}
                            : cartItem
                    )
                };
            } else {
                return {
                    cart: [...state.cart, {
                        ...item,
                        quantity: 1,
                        restaurantId // ✅ lưu vào cart item
                    }]
                };
            }
        });
    },
    clearCart: () => {
        set({cart:[]});
    },
    removeFromTheCart: (id:string) => {
        set((state) => ({
            cart:state.cart.filter((item) => item.id != id)
        }))
    },
    incrementQuantity: (id:string) => {
        set((state) => ({
            cart:state.cart.map((item) => item.id === id ? {...item, quantity:item.quantity + 1} : item)
        }))
    },
    decrementQuantity: (id:string) => {
        set((state) => ({
            cart:state.cart.map((item) => item.id === id ? {...item, quantity:item.quantity - 1} : item)
        }))
    }
}), 
{
    name:'cart-name',
    storage: createJSONStorage(() => localStorage)
}))