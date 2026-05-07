import { Link } from "react-router-dom";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";

import { Button } from "./ui/button";

import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
  LayoutDashboard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Separator } from "./ui/separator";

import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout } =
    useUserStore();

  const { cart } = useCartStore();

  const { setTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/">
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">
              <span className="text-orange-500">
                Eats
              </span>
            </h1>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">

            {/* NAV LINKS */}
            <div className="flex items-center gap-8 text-sm font-medium text-zinc-700 dark:text-zinc-300">

              <Link
                to="/"
                className="hover:text-orange-500 transition"
              >
                Home
              </Link>

              <Link
                to="/profile"
                className="hover:text-orange-500 transition"
              >
                Profile
              </Link>

              <Link
                to="/order/status"
                className="hover:text-orange-500 transition"
              >
                Orders
              </Link>
            </div>

            {/* ADMIN */}
            {user?.admin && (
              <Menubar className="border-none bg-transparent shadow-none">

                <MenubarMenu>

                  <MenubarTrigger className="bg-transparent border border-zinc-200 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-2 transition cursor-pointer">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </MenubarTrigger>

                  <MenubarContent className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-black dark:text-white">

                    <MenubarItem asChild>
                      <Link
                        to="/admin/restaurant"
                        className="cursor-pointer"
                      >
                        Restaurant
                      </Link>
                    </MenubarItem>

                    <MenubarItem asChild>
                      <Link
                        to="/admin/menu"
                        className="cursor-pointer"
                      >
                        Menu
                      </Link>
                    </MenubarItem>

                    <MenubarItem asChild>
                      <Link
                        to="/admin/order"
                        className="cursor-pointer"
                      >
                        Orders
                      </Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4">

            {/* THEME */}
            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-2xl border-zinc-200 dark:border-white/10 bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 text-black dark:text-white"
                >
                  <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

                  <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-black dark:text-white"
              >
                <DropdownMenuItem
                  onClick={() =>
                    setTheme("light")
                  }
                >
                  Light
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    setTheme("dark")
                  }
                >
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CART */}
            <Link
              to="/cart"
              className="relative"
            >
              <Button
                size="icon"
                variant="outline"
                className="rounded-2xl border-zinc-200 dark:border-white/10 bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 text-black dark:text-white"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>

              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-600-500 text-red-900 text-[10px] flex items-center justify-center font-bold">
                  {cart.length}
                </div>
              )}
            </Link>

            {/* PROFILE */}
            <div className="flex items-center gap-3 pl-2">

              <Avatar className="w-10 h-10 border-2 border-orange-500">
                <AvatarImage
                  src={user?.profilePicture}
                />

                <AvatarFallback>
                  CN
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-black dark:text-white">
                  {user?.fullname ||
                    "Yushing"}
                </span>

                <span className="text-xs text-zinc-500">
                  Food Lover
                </span>
              </div>
            </div>

            {/* LOGOUT */}
            {loading ? (
              <Button className="rounded-2xl bg-orange-500 hover:bg-orange-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="rounded-2xl shadow-lg"
              >
                Logout
              </Button>
            )}
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/* MOBILE NAVBAR */

const MobileNavbar = () => {
  const { user, loading, logout } =
    useUserStore();

  const { cart } = useCartStore();

  const { setTheme } = useThemeStore();

  return (
    <Sheet>

      <SheetTrigger asChild>

        <Button
          size={"icon"}
          className="rounded-2xl bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 text-black dark:text-white border border-zinc-200 dark:border-white/10"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white dark:bg-[#0B0B0F] border-l border-zinc-200 dark:border-white/10 text-black dark:text-white flex flex-col">

        {/* HEADER */}
        <SheetHeader>

          <div className="flex items-center justify-between">

            <SheetTitle className="text-2xl font-black text-black dark:text-white">
              Yushing
              <span className="text-orange-500">
                Eats
              </span>
            </SheetTitle>

            {/* THEME */}
            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-zinc-200 dark:border-white/10 bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 text-black dark:text-white"
                >
                  <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

                  <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-black dark:text-white"
              >
                <DropdownMenuItem
                  onClick={() =>
                    setTheme("light")
                  }
                >
                  Light
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    setTheme("dark")
                  }
                >
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetHeader>

        <Separator className="my-6 bg-zinc-200 dark:bg-white/10" />

        {/* MENU */}
        <SheetDescription className="flex-1 space-y-3 text-black dark:text-white">

          <Link
            to="/profile"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-orange-500 transition-all"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>

          <Link
            to="/order/status"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-orange-500 transition-all"
          >
            <HandPlatter className="w-5 h-5" />
            <span>Orders</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-orange-500 transition-all"
          >
            <div className="flex items-center gap-4">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>

            <span className="text-sm">
              ({cart.length})
            </span>
          </Link>

          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-orange-500 transition-all"
              >
                <SquareMenu className="w-5 h-5" />
                <span>Menu</span>
              </Link>

              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-orange-500 transition-all"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Restaurant</span>
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-orange-500 transition-all"
              >
                <PackageCheck className="w-5 h-5" />
                <span>Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        {/* FOOTER */}
        <SheetFooter className="border-t border-zinc-200 dark:border-white/10 pt-5">

          <div className="w-full space-y-4">

            <div className="flex items-center gap-3">

              <Avatar className="border-2 border-orange-500">
                <AvatarImage
                  src={user?.profilePicture}
                />

                <AvatarFallback>
                  CN
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="font-semibold text-black dark:text-white">
                  {user?.fullname ||
                    "Yushing"}
                </h1>

                <p className="text-xs text-zinc-500">
                  Welcome back 👋
                </p>
              </div>
            </div>

            <SheetClose asChild>

              {loading ? (
                <Button className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={logout}
                  className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
                >
                  Logout
                </Button>
              )}
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};