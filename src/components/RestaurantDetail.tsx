import {
  Clock3,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useParams } from "react-router-dom";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const RestaurantDetail = () => {
  const BASE_URL = "http://localhost:5246";

  const params = useParams();

  const { singleRestaurant, getSingleRestaurant } =
    useRestaurantStore();

  const [currentPage, setCurrentPage] = useState(1);

  const menuPerPage = 6;

  useEffect(() => {
    if (params.id) {
      getSingleRestaurant(params.id);
    }
  }, [params.id]);

  // Pagination Logic
  const menus = singleRestaurant?.menus || [];

  const totalPages = Math.ceil(menus.length / menuPerPage);

  const paginatedMenus = useMemo(() => {
    const startIndex = (currentPage - 1) * menuPerPage;
    const endIndex = startIndex + menuPerPage;

    return menus.slice(startIndex, endIndex);
  }, [menus, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      
      {/* Banner */}
      <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden">
        <img
          src={`${BASE_URL}${singleRestaurant?.imageURL}`}
          alt="restaurant"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-10 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 text-white">
              
              <div className="flex items-center gap-2">
                <Badge className="bg-orange hover:bg-orange text-white px-3 py-1 rounded-full">
                  Featured Restaurant
                </Badge>

                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    4.8 Rating
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold">
                {singleRestaurant?.restaurantName ||
                  "Loading..."}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-sm md:text-base">
                
                <div className="flex items-center gap-2">
                  <Clock3 className="w-5 h-5 text-orange-300" />

                  <span>
                    Delivery in{" "}
                    <span className="font-semibold text-orange-300">
                      {singleRestaurant?.deliveryTime || "NA"} mins
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-300" />

                  <span>
                    {singleRestaurant?.city},{" "}
                    {singleRestaurant?.country}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        
        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Array.isArray(singleRestaurant?.cuisines) &&
            singleRestaurant.cuisines.map(
              (cuisine: string, idx: number) => (
                <Badge
                  key={idx}
                  className="bg-orange/10 text-orange hover:bg-orange/20 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {cuisine.trim()}
                </Badge>
              )
            )}
        </div>

        {/* Menu Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Menu
            </h2>

            <p className="text-gray-500 mt-2">
              Explore delicious dishes from this restaurant
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Menu Grid */}
        {paginatedMenus.length > 0 ? (
          <AvailableMenu menus={paginatedMenus} />
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-3xl py-20 text-center">
            <h3 className="text-2xl font-bold text-gray-700">
              No Menu Available
            </h3>

            <p className="text-gray-500 mt-3">
              This restaurant has not added any menu yet.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-3 mt-12">
            
            {/* Prev */}
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="rounded-xl"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={
                    currentPage === index + 1
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`w-10 h-10 rounded-xl ${
                    currentPage === index + 1
                      ? "bg-orange hover:bg-orange/90"
                      : ""
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {/* Next */}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="rounded-xl"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;