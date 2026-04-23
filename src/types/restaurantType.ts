export type MenuItem = {
    id:string;
    name:string;
    description:string;
    price:number;
    image:string;
}

export type Restaurant = {
    id:string;
    user:string;
    restaurantName:string;
    city:string;
    country:string;
    deliveryTime:number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}

// export type searchedRestaurant = {
//     data: Restaurant[];
// }


export type RestaurantState = {
    loading:boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: Restaurant[] | null;
    appliedFilter:string[];
    createRestaurant: (formData:FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData:FormData) => Promise<void>;
    searchRestaurant: (searchText:string, searchQuery:string, selectedCuisines:any) => Promise<void>;
    addMenuToRestaurant: (menu:any) => void;
    updateMenuToRestaurant: (menu:any) => void;    
    setAppliedFilter: (value:string) => void;
    resetAppliedFilter: () => void;
} 