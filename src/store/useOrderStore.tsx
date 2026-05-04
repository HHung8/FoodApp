import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CheckoutSessionRequest, OrderState } from "../types/orderType";
import axiosInstance from "../lib/axiosInstance";

const API_END_POINT:string = "http://localhost:5246/api/order"

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading:false,
    orders:[],
    createCheckoutSession: async (checkoutSession:CheckoutSessionRequest) => {
        try {
            set({loading:true});
            const totalAmount = checkoutSession.cartItem.reduce((sum, item) => {
                return sum + parseFloat(item.price) * parseInt(item.quantity);
            }, 0);

            const payload = {
                restaurantId: checkoutSession.restaurantId,
                deliveryDetails: JSON.stringify(checkoutSession.deliveryDetails),
                cartItems: JSON.stringify(checkoutSession.cartItem),
                totalAmount: totalAmount
            }

            const response = await axiosInstance.post(`${API_END_POINT}/checkout`, 
                payload,
                {headers: {'Content-Type':'application/json'}}
            );
            window.location.href = response.data.session.url;
            set({loading:false})
        } catch (error) {
            set({loading:false})
        }
    },
    getOrderDetails: async () => {

    }

})), {
    name:"order-name",
    storage: createJSONStorage(() => localStorage)
}))