import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:5246/api/user";
axios.defaults.withCredentials = true;

type User = {
    fullname: string,
    email:string, 
    contact:number,
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    isVerified:boolean;
}

export const useUserStore = create<any>()(persist((set) => ({
    user:null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    signup: async (input: SignupInputState) => {
        try {
            set({loading:true});
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`check response`, response);
            if(response.data.success) {
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false, user: response.data.user, isAuthenticated: true})
            };
        } catch (error) {
            toast.error(error.response.data.message);
            set({loading: false});
        }
    }
  }), 
  {
    name: "user-name",
    storage: createJSONStorage(() => localStorage),
  }),
);
