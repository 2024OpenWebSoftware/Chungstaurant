import { doc, getDoc} from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

export default async function getRestaurantData (id: string) {
    try {
      const restaurantRef = doc(ChungstaurantFirestore, "RestaurantData", id);
      const restaurantSnap = await getDoc(restaurantRef); // 데이터 스냅 받아오기 - 비동기처리
      if (restaurantSnap.exists()){
        return restaurantSnap.data();
      } 
    } catch (error) {
      console.log(error);  
    }

    return null;
}
