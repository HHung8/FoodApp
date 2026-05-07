import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

import { Button } from "./ui/button";

import { useState } from "react";

import CheckoutConfirmPage from "./CheckoutConfirmPage";

import { useCartStore } from "../store/useCartStore";

const Cart = () => {
  const API_END_POINT = "http://localhost:5246";

  const [open, setOpen] =
    useState<boolean>(false);

  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    removeFromTheCart,
    clearCart,
  } = useCartStore();

  const totalAmount = cart.reduce(
    (acc, ele) => {
      return acc + ele.price * ele.quantity;
    },
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white py-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10">
          
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange text-sm font-medium mb-4">
              🛒 Shopping Cart
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900">
              Your Cart
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Review your delicious meals before checkout
            </p>
          </div>

          {cart.length > 0 && (
            <Button
              onClick={clearCart}
              variant="outline"
              className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 w-fit"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-3xl py-24 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-orange" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Add your favorite food to continue
            </p>
          </div>
        ) : (
          <div className="grid xl:grid-cols-[1fr_380px] gap-8 items-start">
            
            {/* LEFT SIDE */}
            <div
              className="
                max-h-[80vh]
                overflow-y-auto
                pr-3
                space-y-6
                scroll-smooth

                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-orange
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-orange/80
              "
            >
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-5"
                >
                  <div className="flex flex-col xl:flex-row gap-5">
                    
                    {/* LEFT CONTENT */}
                    <div className="flex gap-5 flex-1 min-w-0">
                      
                      {/* IMAGE */}
                      <Avatar className="w-28 h-28 rounded-2xl shrink-0">
                        <AvatarImage
                          src={`${API_END_POINT}${item.image}`}
                          className="object-cover"
                        />

                        <AvatarFallback>
                          CN
                        </AvatarFallback>
                      </Avatar>

                      {/* INFO */}
                      <div className="flex flex-col justify-between min-w-0 flex-1">
                        
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 truncate">
                            {item.name}
                          </h2>

                          <p className="text-gray-500 mt-2 line-clamp-2">
                            Freshly prepared delicious food with premium ingredients.
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <span className="text-lg text-gray-500">
                            Price:
                          </span>

                          <span className="text-2xl font-bold text-orange">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex xl:flex-col items-center xl:items-end justify-between gap-5 xl:min-w-[220px]">
                      
                      {/* QUANTITY */}
                      <div className="flex items-center rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <Button
                          onClick={() =>
                            decrementQuantity(item.id)
                          }
                          size="icon"
                          variant="ghost"
                          className="rounded-none h-12 w-12 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <div className="w-14 h-12 flex items-center justify-center font-bold text-lg">
                          {item.quantity}
                        </div>

                        <Button
                          onClick={() =>
                            incrementQuantity(item.id)
                          }
                          size="icon"
                          className="rounded-none h-12 w-12 bg-orange hover:bg-orange/90"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* TOTAL */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Total
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900">
                          ₹
                          {item.price *
                            item.quantity}
                        </h3>
                      </div>

                      {/* REMOVE */}
                      <Button
                        onClick={() =>
                          removeFromTheCart(item.id)
                        }
                        variant="outline"
                        className="rounded-xl text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SUMMARY */}
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
                
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Order Summary
                </h2>

                <div className="space-y-5">
                  
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Items</span>

                    <span>{cart.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Delivery Fee</span>

                    <span className="text-green-600 font-semibold">
                      Free
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Tax</span>

                    <span>₹0</span>
                  </div>

                  <div className="border-t pt-5 flex items-center justify-between">
                    <span className="text-xl font-semibold">
                      Total
                    </span>

                    <span className="text-3xl font-extrabold text-orange">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    setOpen(true)
                  }
                  className="w-full mt-8 h-14 rounded-2xl bg-orange hover:bg-orange/90 text-lg font-semibold shadow-lg"
                >
                  Proceed To Checkout

                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-sm text-gray-400 text-center mt-4">
                  Secure payment & fast delivery
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CHECKOUT MODAL */}
        <CheckoutConfirmPage
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default Cart;