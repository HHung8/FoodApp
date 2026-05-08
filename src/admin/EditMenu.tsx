import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Label } from "../components/ui/label";

import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";

import {
  ImagePlus,
  IndianRupee,
  Loader2,
  PencilLine,
  UtensilsCrossed,
} from "lucide-react";

import {
  menuSchema,
  type MenuFormSchema,
} from "../schema/menuSchema";

import { useMenuStore } from "../store/useMenuStore";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuItem;
  editOpen: boolean;
  setEditOpen: Dispatch<
    SetStateAction<boolean>
  >;
}) => {
  const [input, setInput] =
    useState<MenuFormSchema>({
      name: "",
      description: "",
      price: 0,
      image: undefined,
    });

  const [error, setError] =
    useState<
      Partial<MenuFormSchema>
    >({});

  const { loading, editMenu } =
    useMenuStore();

  const changeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
      type,
    } = e.target;

    setInput({
      ...input,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    });
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result =
      menuSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors =
        result.error.formErrors
          .fieldErrors;

      setError(
        fieldErrors as Partial<MenuFormSchema>
      );

      return;
    }

    try {
      const formData =
        new FormData();

      formData.append(
        "name",
        input.name
      );

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

      await editMenu(
        selectedMenu.id,
        formData
      );

      setEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInput({
      name:
        selectedMenu?.name || "",
      description:
        selectedMenu?.description ||
        "",
      price:
        selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog
      open={editOpen}
      onOpenChange={setEditOpen}
    >
      <DialogContent className="sm:max-w-2xl border-none bg-white rounded-[32px] p-0 overflow-hidden shadow-2xl">
        
        {/* TOP HEADER */}
        <div className="relative bg-gradient-to-r from-orange to-orange/80 px-8 py-10 text-white overflow-hidden">
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />

          <div className="relative z-10 flex items-center gap-5">
            
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
              <UtensilsCrossed className="w-8 h-8" />
            </div>

            <div>
              <DialogTitle className="text-3xl font-extrabold text-white">
                Edit Menu
              </DialogTitle>

              <DialogDescription className="text-orange-50 mt-2 text-base">
                Update your menu details to keep your restaurant fresh and exciting 🍔
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={submitHandler}
          className="p-8 space-y-6"
        >
          
          {/* NAME */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Menu Name
            </Label>

            <div className="relative">
              <PencilLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={
                  changeEventHandler
                }
                placeholder="Enter menu name"
                className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
              />
            </div>

            {error.name && (
              <span className="text-xs font-medium text-red-500 mt-2 block">
                {error.name}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Description
            </Label>

            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={
                changeEventHandler
              }
              placeholder="Enter delicious description"
              className="h-14 rounded-2xl border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
            />

            {error.description && (
              <span className="text-xs font-medium text-red-500 mt-2 block">
                {error.description}
              </span>
            )}
          </div>

          {/* PRICE */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Price
            </Label>

            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={
                  changeEventHandler
                }
                placeholder="Enter menu price"
                className="h-14 rounded-2xl pl-12 border-gray-200 focus-visible:ring-2 focus-visible:ring-orange"
              />
            </div>

            {error.price && (
              <span className="text-xs font-medium text-red-500 mt-2 block">
                {error.price}
              </span>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Upload Menu Image
            </Label>

            <div className="relative border-2 border-dashed border-orange/30 rounded-3xl p-8 text-center hover:border-orange transition-colors duration-300 bg-orange-50/40">
              
              <ImagePlus className="w-10 h-10 text-orange mx-auto mb-4" />

              <p className="text-gray-600 mb-2 font-medium">
                Drag & drop your image here
              </p>

              <p className="text-sm text-gray-400 mb-4">
                PNG, JPG up to 5MB
              </p>

              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setInput({
                    ...input,
                    image:
                      e.target
                        .files?.[0] ||
                      undefined,
                  })
                }
                className="cursor-pointer rounded-xl border-gray-200"
              />
            </div>

            {error.image && (
              <span className="text-xs font-medium text-red-500 mt-2 block">
                {error.image?.name}
              </span>
            )}
          </div>

          {/* FOOTER */}
          <DialogFooter className="pt-4 flex-col sm:flex-row gap-3">
            
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setEditOpen(false)
              }
              className="h-14 rounded-2xl border-gray-200"
            >
              Cancel
            </Button>

            {loading ? (
              <Button
                disabled
                className="h-14 rounded-2xl bg-orange hover:bg-orange/90 text-white font-semibold shadow-lg"
              >
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />

                Please wait
              </Button>
            ) : (
              <Button className="h-14 rounded-2xl bg-orange hover:bg-orange/90 text-white font-semibold shadow-lg hover:shadow-orange/30 transition-all duration-300">
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;