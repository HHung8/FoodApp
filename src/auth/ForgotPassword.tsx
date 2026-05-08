import {
  Button,
} from "../components/ui/button";

import {
  Input,
} from "../components/ui/input";

import {
  Loader2,
  Mail,
  ArrowLeft,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState<string>("");

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

          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full" />

          <div className="relative z-10">
            
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <h1 className="text-5xl font-extrabold leading-tight">
              Reset Your
              <br />
              Password 🔐
            </h1>

            <p className="mt-6 text-lg text-orange-50 leading-relaxed">
              Don’t worry. Enter your email and we’ll send you a secure password reset link instantly.
            </p>

            <div className="mt-10 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />

                <p>Secure reset process</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />

                <p>Fast email verification</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />

                <p>Protected account access</p>
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
              Forgot Password
            </h2>

            <p className="text-gray-500 mt-3 text-lg leading-relaxed">
              Enter your email address and we’ll send you a reset link to recover your account.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            
            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
                />
              </div>
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
              <Button className="w-full h-14 rounded-2xl bg-orange hover:bg-orange/90 text-lg font-semibold shadow-lg hover:shadow-orange/30 transition-all duration-300">
                Send Reset Link
              </Button>
            )}

            {/* Back Login */}
            <div className="flex justify-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-orange transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />

                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;