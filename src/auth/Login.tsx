import {Loader2,LockKeyhole,Mail,UtensilsCrossed,} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {Link,useNavigate}from "react-router-dom";
import {useState,type ChangeEvent,type FormEvent,} from "react";
import {userLoginSchema,type LoginInputState} from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";
const Login = () => {
  const [input, setInput] = useState<LoginInputState>({email: "",password: "",});
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const { login } = useUserStore();
  const navigate = useNavigate();
  const changeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value,});
  };

  const loginSubmitHandler =
    async (e: FormEvent) => {
      e.preventDefault();
      const result = userLoginSchema.safeParse(input);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors as Partial<LoginInputState>);
        return;
      }
      try {
        await login(input);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
  const loading = false;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-10 overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />
      {/* Card */}
      <div className="relative w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[40px] overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-orange to-orange/80 text-white p-14 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full" />\
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg">
              <UtensilsCrossed className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-extrabold leading-tight">Welcome<br />Back 👋</h1>

            <p className="mt-6 text-lg text-orange-50 leading-relaxed">
              Login to continue ordering your favorite meals with fast delivery and premium experience.
            </p>

            <div className="mt-10 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />

                <p>Fast food delivery</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />

                <p>Fresh & delicious meals</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />

                <p>Secure online payment</p>
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
              Sign In
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Login to your account and continue your food journey 🍔
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={
              loginSubmitHandler
            }
            className="space-y-6"
          >
            
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-orange hover:text-orange/80 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            {loading ? (
              <Button
                type="submit"
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
                Login
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

            {/* Signup */}
            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-orange hover:text-orange/80 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;