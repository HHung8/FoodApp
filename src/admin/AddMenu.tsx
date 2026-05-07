import { FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

import {
  Loader2,
  Plus,
  UtensilsCrossed,
  FileText,
  IndianRupee,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useMenuStore } from "../store/useMenuStore";
import { useRestaurantStore } from "../store/useRestaurantStore";

import {
  menuSchema,
  type MenuFormSchema,
} from "../schema/menuSchema";

import EditMenu from "./EditMenu";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] =
    useState<boolean>(false);

  const [selectedMenu, setSelectedMenu] =
    useState<any>();

  const [error, setError] = useState<
    Partial<MenuFormSchema>
  >({});

  // PAGINATION
  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const ITEMS_PER_PAGE = 6;

  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const BASE_URL = "http://localhost:5246";

  // PAGINATION LOGIC
  const totalPages = Math.ceil(
    (restaurant?.menus?.length || 0) /
      ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentMenus = restaurant?.menus?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // INPUT CHANGE
  const changeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    setInput({
      ...input,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    });
  };

  // SUBMIT
  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = menuSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors =
        result.error.formErrors.fieldErrors;

      setError(
        fieldErrors as Partial<MenuFormSchema>
      );

      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", input.name);

      formData.append(
        "description",
        input.description
      );

      formData.append(
        "price",
        input.price.toString()
      );

      if (input.image) {
        formData.append(
          "image",
          input.image
        );
      }

      await createMenu(formData);

      setOpen(false);

      // RESET FORM
      setInput({
        name: "",
        description: "",
        price: 0,
        image: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Restaurant Menus
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your delicious foods 🍔
          </p>
        </div>

        {/* ADD MENU */}
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button className="h-12 px-6 rounded-2xl  from-orange-500 to-red-500 shadow-lg">
              <Plus className="mr-2 w-5 h-5" />
              Add Menu
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl rounded-3xl border-none p-0 overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-7 text-white">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  Add New Menu
                </DialogTitle>

                <DialogDescription className="text-orange-100">
                  Create new delicious menu 🍕
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* FORM */}
            <form
              onSubmit={submitHandler}
              className="bg-white dark:bg-zinc-950 p-6 space-y-6"
            >

              {/* IMAGE */}
              <div className="space-y-3">
                <Label className="font-semibold">
                  Upload Image
                </Label>

                {/* PREVIEW */}
                <div className="flex justify-center">
                  <div className="w-44 h-44 rounded-3xl overflow-hidden border-4 border-orange-100 shadow-lg bg-gray-100">
                    {input.image ? (
                      <img
                        src={URL.createObjectURL(
                          input.image
                        )}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="h-12 rounded-xl cursor-pointer"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image:
                        e.target.files?.[0] ||
                        undefined,
                    })
                  }
                />

                {error?.image && (
                  <span className="text-sm text-red-500">
                    {error.image?.name}
                  </span>
                )}
              </div>

              {/* NAME */}
              <div className="space-y-2">
                <Label className="font-semibold">
                  Menu Name
                </Label>

                <div className="relative">
                  <UtensilsCrossed className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={
                      changeEventHandler
                    }
                    placeholder="Burger..."
                    className="pl-11 h-12 rounded-xl"
                  />
                </div>

                {error?.name && (
                  <span className="text-sm text-red-500">
                    {error.name}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label className="font-semibold">
                  Description
                </Label>

                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                  <Input
                    type="text"
                    name="description"
                    value={
                      input.description
                    }
                    onChange={
                      changeEventHandler
                    }
                    placeholder="Description..."
                    className="pl-11 h-12 rounded-xl"
                  />
                </div>

                {error?.description && (
                  <span className="text-sm text-red-500">
                    {error.description}
                  </span>
                )}
              </div>

              {/* PRICE */}
              <div className="space-y-2">
                <Label className="font-semibold">
                  Price
                </Label>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                  <Input
                    type="number"
                    name="price"
                    value={input.price}
                    onChange={
                      changeEventHandler
                    }
                    placeholder="299"
                    className="pl-11 h-12 rounded-xl"
                  />
                </div>

                {error?.price && (
                  <span className="text-sm text-red-500">
                    {error.price}
                  </span>
                )}
              </div>

              {/* FOOTER */}
              <DialogFooter>

                {loading ? (
                  <Button
                    disabled
                    className="w-full h-12 rounded-xl bg-orange-500"
                  >
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 shadow-lg text-white font-semibold">
                    Create Menu
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* MENU GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

        {currentMenus?.map(
          (
            menu: any,
            idx: number
          ) => (
            <div
              key={idx}
              className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`${BASE_URL}${menu.image}`}
                  alt={menu.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />

                <div className="absolute top-4 right-4">
                  <Button
                    size={"icon"}
                    onClick={() => {
                      setSelectedMenu(
                        menu
                      );

                      setEditOpen(true);
                    }}
                    className="rounded-full bg-white text-black hover:bg-orange-500 hover:text-white shadow-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {menu.name}
                  </h1>

                  <span className="text-lg font-bold text-orange-500">
                    ₹{menu.price}
                  </span>
                </div>

                <p className="text-gray-500 mt-3 line-clamp-2">
                  {menu.description}
                </p>

                <Button
                  onClick={() => {
                    setSelectedMenu(
                      menu
                    );

                    setEditOpen(true);
                  }}
                  className="mt-5 w-full rounded-xl bg-black hover:bg-zinc-800 text-white"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Menu
                </Button>
              </div>
            </div>
          )
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">

          {/* PREV */}
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
            className="rounded-xl h-11"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* PAGE NUMBERS */}
          {Array.from({
            length: totalPages,
          }).map((_, index) => (
            <Button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`w-11 h-11 rounded-xl ${
                currentPage ===
                index + 1
                  ? "bg-orange-500 hover:bg-orange-600 text-green-600"
                  : "bg-white text-black border hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </Button>
          ))}

          {/* NEXT */}
          <Button
            variant="outline"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
            className="rounded-xl h-11"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* EDIT MENU */}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;