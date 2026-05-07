import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card";

import { Button } from "./ui/button";

import {
  ShoppingCart,
  Star,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type { MenuItem } from "../types/restaurantType";

import { useCartStore } from "../store/useCartStore";

const AvailableMenu = ({
  menus,
}: {
  menus: MenuItem[];
}) => {
  const { addToCart } = useCartStore();

  const navigate = useNavigate();

  const { id: restaurantId } = useParams();

  const API_END_POINT = "http://localhost:5246";

  return (
    <div className="py-10">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange text-sm font-medium mb-4">
          🍔 Restaurant Special
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900">
          Available Menus
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Discover delicious dishes crafted with love
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {menus?.map((menu: MenuItem) => (
          <Card
            key={menu._id}
            className="group overflow-hidden rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col bg-white py-0"
          >
            
            {/* Image */}
            <div className="relative overflow-hidden h-64">
              <img
                src={`${API_END_POINT}${menu?.image}`}
                alt={menu.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />

              {/* Price */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                <span className="text-orange font-bold text-lg">
                  ₹{menu.price}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                <span className="text-sm font-medium">
                  4.8
                </span>
              </div>
            </div>

            {/* Content */}
            <CardContent className="flex flex-col flex-1 p-6">
              
              {/* Name */}
              <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">
                {menu.name}
              </h2>

              {/* Description */}
              <p className="text-gray-500 mt-3 leading-relaxed line-clamp-2 min-h-[52px]">
                {menu.description}
              </p>

              {/* Footer */}
              <div className="mt-auto pt-6">
                <Button
                  onClick={() => {
                    addToCart(
                      menu,
                      restaurantId as string
                    );

                    navigate("/cart");
                  }}
                  className="w-full h-12 rounded-xl bg-orange hover:bg-orange/90 text-white text-base font-semibold shadow-lg hover:shadow-orange/30 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />

                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {menus?.length === 0 && (
        <div className="bg-white border border-dashed border-gray-300 rounded-3xl py-20 text-center mt-10">
          <h3 className="text-2xl font-bold text-gray-700">
            No Menu Available
          </h3>

          <p className="text-gray-500 mt-3">
            This restaurant has not added any menu yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailableMenu;