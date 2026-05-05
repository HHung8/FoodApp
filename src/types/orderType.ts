import { Orders } from './orderType';
export type CheckoutSessionRequest = {
    cartItem:{
        menuId:string;
        name:string;
        image:string;
        price:string;
        quantity:string;
    }[];
    deliveryDetails: {
        name:string;
        email:string;
        contact:string;
        address:string;
        city:string;
        country:string
    },
    restaurantId:string
};

export interface Orders {
    id:string;
    status:string;
    totalAmount:number;
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[];
    deliveryDetails: {
        name: string;
        email: string;
        contact: string;
        address: string;
        city: string;
        country: string;
    };
    restaurantId: string;
}

export type OrderState = {
    loading:boolean;
    orders:Orders[];
    createCheckoutSession: (checkoutSessionRequest:CheckoutSessionRequest) => Promise<void>;
    getOrderDetails: () => Promise<void>;
}