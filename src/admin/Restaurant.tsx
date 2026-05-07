import React, { useState, FormEvent, useEffect } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  restaurantFromSchema,
  type RestaurantFormSchema,
} from "../schema/restaurantSchema";

import { useRestaurantStore } from "../store/useRestaurantStore";
import { Button } from "../components/ui/button";

import {
  Clock3,
  Globe,
  ImagePlus,
  Loader2,
  MapPin,
  Store,
  UtensilsCrossed,
} from "lucide-react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [errors, setErrors] =
    useState<Partial<RestaurantFormSchema>>({});

  const {
    loading,
    createRestaurant,
    restaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const [previewImage, setPreviewImage] = useState<string>("");

  const changeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors(
        fieldErrors as Partial<RestaurantFormSchema>
      );

      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "restaurantName",
        input.restaurantName
      );

      formData.append("city", input.city);

      formData.append("country", input.country);

      formData.append(
        "deliveryTime",
        input.deliveryTime.toString()
      );

      formData.append(
        "cuisines",
        JSON.stringify(input.cuisines)
      );

      if (input.imageFile) {
        formData.append("image", input.imageFile);
      }

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();

      setInput({
        restaurantName: restaurant?.restaurantName || "",
        city: restaurant?.city || "",
        country: restaurant?.country || "",
        deliveryTime: restaurant?.deliveryTime || 0,
        cuisines: restaurant?.cuisines
          ? JSON.parse(restaurant?.cuisines)
          : [],
        imageFile: undefined,
      });

      if (restaurant?.imageUrl) {
        setPreviewImage(restaurant.imageUrl);
      }
    };

    fetchRestaurant();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange font-medium text-sm mb-4">
            🍔 Restaurant Dashboard
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            {restaurant
              ? "Update Restaurant"
              : "Create Your Restaurant"}
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage your restaurant information, cuisines,
            delivery details, and banner image.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Banner Preview */}
          <div className="relative h-72 bg-gray-100 overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Restaurant Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <ImagePlus className="w-14 h-14 mb-3" />
                <p className="text-lg font-medium">
                  Upload Restaurant Banner
                </p>
              </div>
            )}

            <div className="absolute inset-0 bg-black/20" />
          </div>

          <form
            onSubmit={submitHandler}
            className="p-8 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Restaurant Name */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Restaurant Name
                </Label>

                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange" />

                  <Input
                    type="text"
                    name="restaurantName"
                    value={input.restaurantName}
                    onChange={changeEventHandler}
                    placeholder="Enter restaurant name"
                    className="pl-12 h-12 rounded-xl border-gray-200"
                  />
                </div>

                {errors.restaurantName && (
                  <span className="text-sm text-red-500">
                    {errors.restaurantName}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  City
                </Label>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange" />

                  <Input
                    type="text"
                    name="city"
                    value={input.city}
                    onChange={changeEventHandler}
                    placeholder="Enter city"
                    className="pl-12 h-12 rounded-xl border-gray-200"
                  />
                </div>

                {errors.city && (
                  <span className="text-sm text-red-500">
                    {errors.city}
                  </span>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Country
                </Label>

                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange" />

                  <Input
                    type="text"
                    name="country"
                    value={input.country}
                    onChange={changeEventHandler}
                    placeholder="Enter country"
                    className="pl-12 h-12 rounded-xl border-gray-200"
                  />
                </div>

                {errors.country && (
                  <span className="text-sm text-red-500">
                    {errors.country}
                  </span>
                )}
              </div>

              {/* Delivery Time */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Delivery Time (minutes)
                </Label>

                <div className="relative">
                  <Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange" />

                  <Input
                    type="number"
                    name="deliveryTime"
                    value={input.deliveryTime}
                    onChange={changeEventHandler}
                    placeholder="e.g. 30"
                    className="pl-12 h-12 rounded-xl border-gray-200"
                  />
                </div>

                {errors.deliveryTime && (
                  <span className="text-sm text-red-500">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>

              {/* Cuisines */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm text-gray-600">
                  Cuisines
                </Label>

                <div className="relative">
                  <UtensilsCrossed className="absolute left-4 top-4 w-5 h-5 text-orange" />

                  <Input
                    type="text"
                    name="cuisines"
                    value={input.cuisines}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        cuisines: e.target.value.split(","),
                      })
                    }
                    placeholder="Pizza, Burger, Sushi..."
                    className="pl-12 h-12 rounded-xl border-gray-200"
                  />
                </div>

                <p className="text-sm text-gray-400">
                  Separate cuisines with commas
                </p>

                {errors.cuisines && (
                  <span className="text-sm text-red-500">
                    {errors.cuisines}
                  </span>
                )}
              </div>

              {/* Upload Banner */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm text-gray-600">
                  Restaurant Banner
                </Label>

                <div className="border-2 border-dashed border-orange/30 rounded-2xl p-8 text-center hover:bg-orange-50 transition-all">
                  <ImagePlus className="mx-auto w-10 h-10 text-orange mb-3" />

                  <p className="text-gray-700 font-medium">
                    Upload banner image
                  </p>

                  <p className="text-sm text-gray-400 mb-4">
                    PNG, JPG up to 5MB
                  </p>

                  <Input
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    className="max-w-sm mx-auto cursor-pointer"
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0] || undefined;

                      setInput({
                        ...input,
                        imageFile: file,
                      });

                      if (file) {
                        setPreviewImage(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                  />
                </div>

                {errors.imageFile && (
                  <span className="text-sm text-red-500">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              {loading ? (
                <Button
                  disabled
                  className="bg-orange hover:bg-orange/90 h-12 px-8 rounded-xl"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-orange/90 h-12 px-8 rounded-xl shadow-lg">
                  {restaurant
                    ? "Update Restaurant"
                    : "Create Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;