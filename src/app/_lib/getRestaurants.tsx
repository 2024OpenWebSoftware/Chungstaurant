import { collection, getDocs, query, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

export default async function getRestaurants(searchParam?: string) {
  try {
    const restaurantCollectionRef = collection(ChungstaurantFirestore, 'RestaurantData');

    let restaurantQuery;

    if (searchParam) {
      restaurantQuery = query(restaurantCollectionRef, where('tagList', 'array-contains', searchParam));
    } else {
      restaurantQuery = restaurantCollectionRef;
    }

    const restaurantListSnap = await getDocs(restaurantQuery); // 쿼리를 실행하여 결과를 가져옵니다.
    const data = restaurantListSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    return data;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return [];
  }
}
