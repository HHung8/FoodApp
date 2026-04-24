import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";
import axiosInstance from "../lib/axiosInstance";
import { file } from "zod";

const API_END_POINT = "http://localhost:5246/api/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({loading: false,user: response.data.user,isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
          throw error;
        }
      },
      
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            localStorage.setItem("token", response.data.data.token);
            set({loading: false, user: response.data.data.user, isAuthenticated: true});
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
          throw error;
        }
      },

      verifyEmail: async (verificationCode: string) => {
        try {
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.data,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          toast.error(error.response.data.message);
          set({ loading: false });
          throw error;
        }
      },

      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axiosInstance.get(`${API_END_POINT}/check-auth`);
          console.log(`check response CheckingAuth`, response);
          if (response.data.success) {
            set({user: response.data.data, isAuthenticated: true, isCheckingAuth: false });
          }
        } catch (error) {
          set({ isAuthenticated: false, isCheckingAuth: false });
        } 
      },

      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ loading: false });
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email },
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/reset-password/${token}`,{ newPassword });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      
      updateProfile: async (input: any) => {
            try {
                const response = await axiosInstance.put(
                    `${API_END_POINT}/profile/update`,
                    input, // FormData
                    { headers: { "Content-Type": "multipart/form-data" } } // ✅ đổi sang multipart
                );
                if (response.data.success) {
                    toast.success(response.data.message);
                    set((state) => ({
                        user: {
                            ...state.user,         // ✅ giữ lại isVerified, admin,...
                            ...response.data.data  // ✅ ghi đè data mới
                        },
                        isAuthenticated: true
                    }));
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
