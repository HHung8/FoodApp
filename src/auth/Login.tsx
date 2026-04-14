import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent} from "react";
import { userLoginSchema, type LoginInputState } from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";

// interface LoginInputState {
//   email: string;
//   password: string;
// }

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const {login} = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async(e:FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if(!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors as Partial<LoginInputState>);
        return;
    }
    try {
       await login(input);
       navigate("/")
    } catch (error) {
        console.log(error);
    }
};

  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 rounded-lg"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Yushing Dev Eats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 focus-visible:ring-1"
              value={input.email}
              onChange={changeEventHandler}
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="pl-10 focus-visible:ring-1"
              value={input.password}
              onChange={changeEventHandler}
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              Login
            </Button>
          )}
          <div className="mt-4">
            <Link to="/forgot-password" className="text-blue-500">Forgot Password</Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
