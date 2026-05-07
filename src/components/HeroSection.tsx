import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "../assets/hero_pizza.png";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate(`/search/${searchText}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-200/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div className="w-fit px-4 py-2 rounded-full bg-orange-100 text-orange text-sm font-semibold shadow-sm">
              🍕 Fastest Food Delivery Service
            </div>

            {/* Heading */}
            <div className="space-y-5">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Delicious Food,
                <span className="text-orange"> Delivered </span>
                To Your Door
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                Discover the best restaurants near you and order your favorite
                meals anytime, anywhere. Fresh food, fast delivery, and amazing
                taste.
              </p>
            </div>

            {/* Search Box */}
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-3 flex items-center gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  type="text"
                  value={searchText}
                  placeholder="Search restaurant, food, city..."
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-12 h-12 border-none focus-visible:ring-0 shadow-none text-base"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>

              <Button
                onClick={handleSearch}
                className="h-12 px-6 rounded-xl bg-orange hover:bg-orange/90 text-white font-semibold transition-all duration-300"
              >
                Search
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-500 text-sm">Restaurants</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">10k+</h3>
                <p className="text-gray-500 text-sm">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">30min</h3>
                <p className="text-gray-500 text-sm">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            {/* Decorative Circle */}
            <div className="absolute w-[450px] h-[450px] bg-orange/10 rounded-full blur-2xl" />

            <img
              src={HeroImage}
              alt="Delicious Food"
              className="relative z-10 w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />

            {/* Floating Card */}
            <div className="absolute bottom-8 left-0 bg-white shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center text-white text-xl">
                🍔
              </div>

              <div>
                <h4 className="font-bold text-gray-900">Fresh Burger</h4>
                <p className="text-sm text-gray-500">
                  Delivered in 20 mins
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;