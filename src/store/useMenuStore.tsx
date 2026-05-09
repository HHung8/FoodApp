import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";
import { useRestaurantStore } from "./useRestaurantStore";
import { MENU_API } from "../lib/apiEndpoints";

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
            const response = await axiosInstance.post(MENU_API.CREATE, formData, {
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
        const response = await axiosInstance.put(MENU_API.UPDATE(menuId), formData, {
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