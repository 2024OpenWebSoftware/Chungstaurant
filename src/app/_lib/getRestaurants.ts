import { collection, getDocs, query, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

export default async function getRestaurants(tagParam?: string) {
  try {
    const restaurantCollectionRef = collection(ChungstaurantFirestore, 'RestaurantData');

    let restaurantQuery;

    if (tagParam) {
      restaurantQuery = query(restaurantCollectionRef, where('tagList', 'array-contains', tagParam));
    } else {
      restaurantQuery = restaurantCollectionRef;
    }

    const restaurantListSnap = await getDocs(restaurantQuery); // 쿼리를 실행하여 결과를 가져옵니다.
    const data = restaurantListSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id // <-여기의 id는 꼭 getRestaurntData(), createReviewListData(), getReviewListData()에 넘겨주어야함
    }));

    return data;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return [];
  }
}
