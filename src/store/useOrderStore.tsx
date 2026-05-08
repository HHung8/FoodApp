import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CheckoutSessionRequest, OrderState } from "../types/orderType";
import axiosInstance from "../lib/axiosInstance";

const API_END_POINT:string = "http://localhost:5246/api/order"

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading:false,
    orders:[],
    error: null,
    currentOrder: null,

    createCheckoutSession: async (checkoutSession:CheckoutSessionRequest) => {
        try {
            set({loading:true});
            const totalAmount = checkoutSession.cartItem.reduce((sum, item) => {
                return sum + parseFloat(item.price) * parseInt(item.quantity);
            }, 0);

            const payload = {
                restaurantId: checkoutSession.restaurantId,
                deliveryDetails: JSON.stringify(checkoutSession.deliveryDetails),
                cartItems: JSON.stringify(checkoutSession.cartItem.map(item => ({
                    ...item,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity)
                }))),
                totalAmount: totalAmount
            }
            console.log("checkpaylad", payload)
            const response = await axiosInstance.post(`${API_END_POINT}/checkout`, 
                payload,
                {headers: {'Content-Type':'application/json'}}
            );
            console.log(`check response`, response.data);
            if(response.data?.session?.url) {
                const orderData = {
                    id: "",
                    restaurantId: checkoutSession.restaurantId,
                    cartItems: checkoutSession.cartItem.map(item => ({
                        ...item,
                        price: parseFloat(item.price),
                        quantity: parseInt(item.quantity)
                    })),
                    deliveryDetails: checkoutSession.deliveryDetails,
                    totalAmount: totalAmount,
                    status: "pending"
                };
                
                localStorage.setItem("currentOrder", JSON.stringify(orderData));
                window.location.href = response.data.session.url;
            }
            set({loading:false})    
        } catch (error: any) {
            console.error("Checkout error", error.response?.data || error.message);
            set({loading:false})
        }
    },
    getOrderDetails: async () => {
        try {
            set({loading: true, error: null});
            const response = await axiosInstance.get(`${API_END_POINT}`);
            console.log(`check response orders 123`, response);
            const orders = response.data.orders.map((order:any) => ({
                ...order,
               cartItems: JSON.parse(order.cartItems),
               deliveryDetails: JSON.parse(order.deliveryDetails)
            }));
            console.log(`check orders1234`, orders);
            set({loading:false, orders})
        } catch (error) {
            set({loading:false})
        }
    },
    clearCurrentOrder: () => set({ currentOrder: null }),

    })), {
    name:"order-name",
    storage: createJSONStorage(() => localStorage)
}))