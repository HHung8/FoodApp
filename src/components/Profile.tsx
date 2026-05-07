import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
  Camera,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    profileData?.profilePicture || ""
  );

  const [profilePictureFile, setProfilePictureFile] =
    useState<File | null>(null);

  const fileChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePictureFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedProfilePicture(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const updateProfileHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("fullname", profileData.fullname);
      formData.append("email", profileData.email);
      formData.append("address", profileData.address);
      formData.append("city", profileData.city);
      formData.append("country", profileData.country);

      if (profilePictureFile) {
        formData.append("profilePicture", profilePictureFile);
      }

      await updateProfile(formData);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white py-10 px-4">
      <form
        onSubmit={updateProfileHandler}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Top Banner */}
          <div className="h-40 bg-gradient-to-r from-orange to-orange/80 relative" />

          {/* Profile Info */}
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                  <AvatarImage
                    src={selectedProfilePicture}
                    className="object-cover"
                  />

                  <AvatarFallback className="text-3xl font-bold bg-orange text-white">
                    {profileData.fullname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <input
                  ref={imageRef}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                />

                <button
                  type="button"
                  onClick={() => imageRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-orange hover:bg-orange/90 text-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Name */}
              <div className="flex-1">
                <Input
                  type="text"
                  name="fullname"
                  value={profileData.fullname}
                  onChange={changeHandler}
                  className="border-none shadow-none focus-visible:ring-0 text-3xl md:text-4xl font-bold px-0 bg-transparent"
                />

                <p className="text-gray-500 mt-1">
                  Manage your personal information
                </p>
              </div>

              {/* Update Button Desktop */}
              <div className="hidden md:block">
                {isLoading ? (
                  <Button
                    disabled
                    className="bg-orange hover:bg-orange/90 rounded-xl px-6 h-12"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button className="bg-orange hover:bg-orange/90 rounded-xl px-6 h-12 shadow-lg">
                    Save Changes
                  </Button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              
              {/* Email */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-orange/10 p-3 rounded-xl">
                    <Mail className="text-orange w-5 h-5" />
                  </div>

                  <div className="w-full">
                    <Label className="text-gray-500 text-sm">
                      Email Address
                    </Label>

                    <Input
                      name="email"
                      disabled
                      value={profileData.email}
                      className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 font-medium text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-orange/10 p-3 rounded-xl">
                    <LocateIcon className="text-orange w-5 h-5" />
                  </div>

                  <div className="w-full">
                    <Label className="text-gray-500 text-sm">
                      Address
                    </Label>

                    <Input
                      name="address"
                      value={profileData.address}
                      onChange={changeHandler}
                      placeholder="Enter your address"
                      className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-orange/10 p-3 rounded-xl">
                    <MapPin className="text-orange w-5 h-5" />
                  </div>

                  <div className="w-full">
                    <Label className="text-gray-500 text-sm">
                      City
                    </Label>

                    <Input
                      name="city"
                      value={profileData.city}
                      onChange={changeHandler}
                      placeholder="Enter your city"
                      className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Country */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-orange/10 p-3 rounded-xl">
                    <MapPinnedIcon className="text-orange w-5 h-5" />
                  </div>

                  <div className="w-full">
                    <Label className="text-gray-500 text-sm">
                      Country
                    </Label>

                    <Input
                      name="country"
                      value={profileData.country}
                      onChange={changeHandler}
                      placeholder="Enter your country"
                      className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Button */}
            <div className="mt-8 md:hidden">
              {isLoading ? (
                <Button
                  disabled
                  className="w-full bg-orange hover:bg-orange/90 h-12 rounded-xl"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <Button className="w-full bg-orange hover:bg-orange/90 h-12 rounded-xl shadow-lg">
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;