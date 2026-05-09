import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";
import type { RestaurantState } from "../types/restaurantType";
import { parseCuisines } from "../lib/paserJson";
import { RESTAURANT_API } from "../lib/apiEndpoints";

export const useRestaurantStore = create<RestaurantState>()(persist((set) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurantOrder: [],

    createRestaurant: async(formData:FormData ) => {
        try {
            set({loading:true});
            const response = await axiosInstance.post(RESTAURANT_API.CREATE, formData, {
                headers: {'Content-Type':'multipart/form-data'}
            });
            if(response.data.success) {
                toast.success(response.data.message);
                set({loading:false});
            }
        } catch (error) {
            toast.error(axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred");
            set({loading:false});
            throw error;
        }
    }, 
    getRestaurant: async() => {
        try {
            set({loading:true});
            const response = await axiosInstance.get(RESTAURANT_API.GET);
            if(response.data.success) {
                set({loading:false, restaurant: response.data.restaurants});
            }
        } catch (error) {
            toast.error(axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred");
            set({loading:false});
            throw error;
        }
    },
    updateRestaurant: async(fomData: FormData) => {
        try {
            set({loading: true});
            const response = await axiosInstance.put(RESTAURANT_API.UPDATE, fomData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            if(response.data.success) {
                const data = response.data.data;
                toast.success(response.data.message);
                set({loading:false, restaurant: {...data, cuisines: data?.cuisines ? JSON.parse(data.cuisines) : []}});
            }
        } catch (error) {
            toast.error(axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred");
            set({loading:false});
            throw error;
        }
    },
    searchRestaurant: async (searchText:string, searchQuery:string, selectedCuisines:any) => {
        try {
            set({loading: true});
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines.join(", "));
            const response = await axiosInstance.get(`${RESTAURANT_API.SEARCH(searchText)}?${params.toString()}`);
            set({loading:false, searchedRestaurant: response.data});   
        } catch (error) {
            toast.error(axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred");
            set({loading:false});
            throw error;
        }
    },
    addMenuToRestaurant: (menu:any) => {
        set((state:any) => ({
            restaurant: state.restaurant ? {...state.restaurant, menus:[...state.restaurant.menus, menu]} : null,
        })) 
    },
    updateMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
            if (state.restaurant) {
                const updatedMenuList = state.restaurant.menus.map((menu: any) =>
                    menu.id === updatedMenu.id ? updatedMenu : menu 
                );
                return {
                    restaurant: {
                        ...state.restaurant,
                        menus: updatedMenuList
                    }
                };
            }
            return state;
        });
    },
    // appliedFilter -> ["momos", "biryani"]
    setAppliedFilter: (value:string) => {
        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item != value) : [...state.appliedFilter, value];
            return {appliedFilter:updatedFilter}
        })
    },
    resetAppliedFilter: () => {
        set({appliedFilter:[]});
    },
    getSingleRestaurant: async (restaurantId:string) => {
        try {
            const response = await axiosInstance.get(RESTAURANT_API.GET_SINGLE(restaurantId));
            if(response.data.success) {
                const data = response.data.restaurant;
                set({
                    singleRestaurant: {
                        ...data,
                        cuisines: parseCuisines(data?.cuisines)
                    }
                })
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getRestaurantOrders: async () => {
        try {
            const response = await axiosInstance.get(RESTAURANT_API.GET_ORDERS);
            if(response.data.success) {
               const orders = response.data.data.map((order: any) => ({
                ...order,
                cartItems: JSON.parse(order.cartItems),
                deliveryDetails: JSON.parse(order.deliveryDetails)
            }));
            set({restaurantOrder: orders})    
        }
        } catch (error) {
            console.log(error);
        }
    },
    updateRestaurantOrders: async(orderId:string, status:string) => {
        try {
            const response = await axiosInstance.put(RESTAURANT_API.UPDATE_ORDER(orderId), {status}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
           if(response.data.success) {
                set((state) => ({
                    restaurantOrder: state.restaurantOrder.map((order:any) => 
                        order.id === orderId ? {...order, status:response.data.data.status} : order)
                }));
                toast.success(response.data.message);
           }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }
}), {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage)
}))