import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:5246/api/menu";

type MenuState = {
    loading:boolean;
    menu:null;
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>
}

export const useMenuStore = create<MenuState>()(
 persist( 
    (set) => ({
    loading:false,
    menu: null,
    createMenu: async (formData: FormData) => {
        try {
            set({loading: true});
            const response = await axiosInstance.post(`${API_END_POINT}/create`, formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                },
            });
            if(response.data.success) {
                toast.success(response.data.message);
                set({ loading:false, menu: response.data.menu });
                await useRestaurantStore.getState().getRestaurant(response.data.menu);
            }
            // update restaurant
        } catch (error: any) {
            toast.error(error.response.data.message || "Error creating menu");
            set({loading:false});
        }
    },

    editMenu: async(menuId: string, formData: FormData) => {
    try {
        set({loading: true});
        const response = await axiosInstance.put(`${API_END_POINT}/${menuId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        if(response.data.success) {
            toast.success(response.data.message);
            const updatedMenu = response.data.menu;
            set({loading: false, menu: updatedMenu});
            await useRestaurantStore.getState().updateMenuToRestaurant(updatedMenu); 
        }
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Error editing menu");
        set({loading: false});
    }
}

}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))