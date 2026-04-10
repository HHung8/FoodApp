import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create()(persist((set) => ({

}), 
{
    name:'user-name',
    storage: createJSONStorage(() => localStorage)
}))