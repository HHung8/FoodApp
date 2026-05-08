import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Loader2,
  LockKeyhole,
  Mail,
  PhoneOutgoing,
  User,
  UtensilsCrossed,
} from "lucide-react";

import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";

import { Separator } from "../components/ui/separator";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useUserStore } from "../store/useUserStore";

import {
  userSignupSchema,
  type SignupInputState,
} from "../schema/userSchema";

const Signup = () => {
  const [input, setInput] =
    useState<SignupInputState>({
      fullname: "",
      email: "",
      password: "",
      contact: "",
    });

  const [errors, setErrors] =
    useState<
      Partial<SignupInputState>
    >({});

  const { signup } =
    useUserStore();

  const navigate =
    useNavigate();

  const loading = false;

  const changeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } =
      e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const signupSubmitHandler =
    async (e: FormEvent) => {
      e.preventDefault();

      const result =
        userSignupSchema.safeParse(
          input
        );

      if (!result.success) {
        const fieldErrors =
          result.error.flatten()
            .fieldErrors;

        setErrors(
          fieldErrors as Partial<SignupInputState>
        );

        return;
      }

      try {
        await signup(input);

        navigate("/verify-email");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-10 overflow-hidden">
      
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[40px] overflow-hidden grid lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-orange to-orange/80 text-white p-14 relative overflow-hidden">
          
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full" />

          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full" />

          <div className="relative z-10">
            
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg">
              <UtensilsCrossed className="w-10 h-10" />
            </div>

            <h1 className="text-5xl font-extrabold leading-tight">
              Join The
              <br />
              Food Journey 🍕
            </h1>

            <p className="mt-6 text-lg text-orange-50 leading-relaxed">
              Create your account and start ordering delicious meals with fast delivery and premium experience.
            </p>

            <div className="mt-10 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />
                <p>Fast & secure ordering</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />
                <p>Fresh delicious meals</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />
                <p>Exclusive offers & discounts</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange text-white flex items-center justify-center shadow-lg">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Signup and enjoy your favorite meals anytime 🍔
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={
              signupSubmitHandler
            }
            className="space-y-6"
          >
            
            {/* Fullname */}
            <div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  type="text"
                  placeholder="Enter your fullname"
                  name="fullname"
                  value={input.fullname}
                  onChange={
                    changeEventHandler
                  }
                  className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
                />
              </div>

              {errors.fullname && (
                <span className="text-sm text-red-500 mt-2 block">
                  {errors.fullname}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={input.email}
                  onChange={
                    changeEventHandler
                  }
                  className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
                />
              </div>

              {errors.email && (
                <span className="text-sm text-red-500 mt-2 block">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={input.password}
                  onChange={
                    changeEventHandler
                  }
                  className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
                />
              </div>

              {errors.password && (
                <span className="text-sm text-red-500 mt-2 block">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Contact */}
            <div>
              <div className="relative">
                <PhoneOutgoing className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  type="text"
                  placeholder="Enter your contact"
                  name="contact"
                  value={input.contact}
                  onChange={
                    changeEventHandler
                  }
                  className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
                />
              </div>

              {errors.contact && (
                <span className="text-sm text-red-500 mt-2 block">
                  {errors.contact}
                </span>
              )}
            </div>

            {/* Button */}
            {loading ? (
              <Button
                disabled
                className="w-full h-14 rounded-2xl bg-orange hover:bg-orange/90 text-lg font-semibold shadow-lg"
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl bg-orange hover:bg-orange/90 text-lg font-semibold shadow-lg hover:shadow-orange/30 transition-all duration-300"
              >
                Signup
              </Button>
            )}

            {/* Divider */}
            <div className="relative py-2">
              <Separator />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-400">
                  OR
                </span>
              </span>
            </div>

            {/* Login */}
            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange hover:text-orange/80 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;