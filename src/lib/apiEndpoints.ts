// ----- USER --------
export const USER_API = {
    SIGNUP:             "/user/signup",
    LOGIN:              "/user/login",
    LOGOUT:             "/user/logout",
    VERIFY_EMAIL:       "/user/verify-email",
    CHECK_AUTH:         "/user/check-auth",
    FORGOT_PASSWORD:    "/user/forgot-password",
    RESET_PASSWORD:     (token: string) => `/user/reset-password/${token}`,
    UPDATE_PROFILE:      "/user/profile/update",
};

// ---- RESTAURANT --------
export const RESTAURANT_API = {
    CREATE:        "/restaurant",
    GET:           "/restaurant",
    UPDATE:        "/restaurant",
    SEARCH:        (searchText: string) => `/restaurant/search/${searchText}`,
    GET_SINGLE:    (id:string) => `/restaurant/${id}`,
    GET_ORDERS:    "/restaurant/order",
    UPDATE_ORDER:  (orderId: string) => `/restaurant/order/${orderId}/status`,
};

// ---- MENU -----
export const MENU_API = {
    CREATE: "/menu/create",
    UPDATE: (menuId:string) => `/menu/${menuId}`,
};

// ---- ORDER -----
export const ORDER_API = {
    GET:        "/order",
    CHECKOUT:   "/order/checkout"
};