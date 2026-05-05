import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";
import type { RestaurantState } from "../types/restaurantType";
import { parseCuisines } from "../lib/paserJson";
import type { Orders } from "../types/orderType";

const API_END_POINT = "http://localhost:5246/api/restaurant";


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
            const response = await axiosInstance.post(`${API_END_POINT}`, formData, {
                headers: {'Content-Type':'multipart/form-data'}
            });
            console.log(`check response create data`, response)
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
            const response = await axiosInstance.get(`${API_END_POINT}`);
            console.log(`check response get data restaurant`, response.data.restaurants);
            if(response.data.success) {
                set({
                    loading:false, 
                    restaurant: response.data.restaurants
                });
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
            const response = await axiosInstance.put(`${API_END_POINT}`, fomData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(`Check Response Restaurant Updated`, response);
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
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await axiosInstance.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            set({loading:false, searchedRestaurant: response.data});   
            // if(response.data.success) {
            //     console.log(response.data);
            //     set({loading:false, searchedRestaurant: response.data});   
            // }
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
            const response = await axiosInstance.get(`${API_END_POINT}/${restaurantId}`);
            console.log(`check response restaurant detail123`, response.data.restaurant);
            
            if(response.data.success) {
                const data = response.data.restaurant;
                console.log("raw cuisines:", data?.cuisines);
                console.log("parsed cuisines:", parseCuisines(data?.cuisines));
      
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
            const response = await axiosInstance.get(`${API_END_POINT}/order`);
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
            const response = await axiosInstance.put(`${API_END_POINT}/order/${orderId}/status`, {status}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
           if(response.data.success) {
                set((state) => ({
                    restaurantOrder: state.restaurantOrder.map((order:any) => order.id === orderId ? {...order, status:response.data.data.status} : order)
                }));
                toast.success(response.data.message);
           }
        } catch (error: any) {
            toast.error(message);
        }
    }

}), {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage)
}))