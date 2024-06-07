import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";
import { Restaurant } from '@/model/Restaurant';

type Props = {
  pageParam?: number;
};

export default async function getRestaurants({ pageParam }: Props) {
  try {
    const restaurantCollectionRef = collection(ChungstaurantFirestore, 'RestaurantData');

    let restaurantQuery;

    // if (tagParam) {
    //   restaurantQuery = query(restaurantCollectionRef, where('tagList', 'array-contains', tagParam));
    // } else {
    //   restaurantQuery = restaurantCollectionRef;
    // }

    console.log(pageParam);

    if (pageParam) {
      restaurantQuery = query(
        restaurantCollectionRef,
        orderBy("id"),
        startAfter(pageParam),
        limit(12)
      );
    } else {
      restaurantQuery = query(
        restaurantCollectionRef,
        orderBy("id"),
        limit(12)
      );
    }

    const restaurantListSnap = await getDocs(restaurantQuery); // 쿼리를 실행하여 결과를 가져옵니다.
    const data: Restaurant[] = restaurantListSnap.docs.map(doc => ({
      ...doc.data() as Restaurant,
    }));

    return data;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return [];
  }
}
