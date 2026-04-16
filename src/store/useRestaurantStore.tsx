import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

const API_END_POINT = "http://localhost:5246/api/restaurant";

export const useRestaurantStore = create()(persist((set) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
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
    
    updateRestaurant: async(formData: FormData) => {
        try {
            set({loading: true});
            const response = await axiosInstance.put(`${API_END_POINT}`, formData, {
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

    searchRestaurant: async (searchText:string, searchQuery:string, selectedCuisines:string) => {
        try {
            set({loading: true});
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines);
            const response = await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}?${params.toString()}`);
            if(response.data.success) {
                console.log(response.data);
                set({loading:false, searchedRestaurant: response.data});   
            }
        } catch (error) {
            toast.error(axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred");
            set({loading:false});
            throw error;
        }
    }

}), {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage)
}))