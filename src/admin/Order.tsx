import { useEffect } from "react";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  outfordelivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const Order = () => {
  const {
    restaurantOrder,
    getRestaurantOrders,
    updateRestaurantOrders,
  } = useRestaurantStore();

  useEffect(() => {
    getRestaurantOrders();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: string
  ) => {
    await updateRestaurantOrders(id, status);
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-black overflow-hidden">
      <div className="flex h-full">

        {/* LEFT SIDEBAR */}
        <div className="hidden lg:flex w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex-col p-6">
          <h1 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
            Food Admin
          </h1>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-black text-white">
              <p className="text-sm opacity-70">Total Orders</p>
              <h2 className="text-3xl font-bold mt-2">
                {restaurantOrder?.length || 0}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-green-500 text-white">
              <p className="text-sm opacity-70">Delivered</p>
              <h2 className="text-3xl font-bold mt-2">
                {
                  restaurantOrder?.filter(
                    (o) => o.status === "delivered"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 px-8 py-5">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Orders
            </h1>
          </div>

          {/* ORDERS */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-5">
              {restaurantOrder?.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-zinc-800"
                >
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                    {/* LEFT INFO */}
                    <div className="flex items-start gap-4">

                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                        {order.deliveryDetails.name?.charAt(0)}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {order.deliveryDetails.name}
                          </h2>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              statusColors[
                                order.status.toLowerCase()
                              ]
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <p className="text-gray-500 mt-2 max-w-xl">
                          📍 {order.deliveryDetails.address}
                        </p>

                        <div className="mt-4 flex items-center gap-6 flex-wrap">
                          <div>
                            <p className="text-sm text-gray-400">
                              Total
                            </p>

                            <h3 className="text-2xl font-bold text-green-600">
                              ${order.totalAmount / 100}
                            </h3>
                          </div>

                          <div>
                            <p className="text-sm text-gray-400">
                              Order ID
                            </p>

                            <h3 className="font-medium text-gray-700 dark:text-gray-300">
                              #{order.id.slice(0, 8)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STATUS SELECT */}
                    <div className="w-full xl:w-64">
                      <Label className="mb-2 block text-sm">
                        Update Status
                      </Label>

                      <Select
                        defaultValue={order.status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(
                            order.id,
                            newStatus
                          )
                        }
                      >
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {[
                              "Pending",
                              "Confirmed",
                              "Preparing",
                              "OutForDelivery",
                              "Delivered",
                            ].map((status, index) => (
                              <SelectItem
                                key={index}
                                value={status.toLowerCase()}
                              >
                                {status}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;