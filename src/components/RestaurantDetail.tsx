import { Timer } from 'lucide-react';
import { useParams } from 'react-router-dom';
import AvailableMenu from './AvailableMenu';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useEffect } from 'react';

const RestaurantDetail = () => {
  const params = useParams();
  const {singleRestaurant, getSingleRestaurant} = useRestaurantStore();

  useEffect(() => {
    if (params.id) {
      getSingleRestaurant(params.id);
      console.log(singleRestaurant);
    }
  }, [params.id])

  return (
   <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            // src={singleRestaurant?.imageUrl || "Loading..."}
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Rm9vZHxlbnwwfHwwfHx8MA%3D%3D"
            alt="res_image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
                Test
                {/* {singleRestaurant?.restaurantName || "Loading..."} */}
            </h1>
            <div className="flex gap-2 my-2">
              {/* {singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))} */}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#D19254]"> mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <AvailableMenu />
       {/* {singleRestaurant?.menus && <AvailableMenu menus = {singleRestaurant?.menus!}/>}  */}
      </div>
    </div>
  )
}

export default RestaurantDetail