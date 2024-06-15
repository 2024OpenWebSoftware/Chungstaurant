import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";
import { Restaurant } from '@/model/Restaurant';

type Props = {
  queryKey: [_1: string, searchParams: { type?: string; search?: string; }]
  pageParam?: number;
};

export default async function getRestaurants({ queryKey, pageParam }: Props) {
  const [_1, searchParams] = queryKey;

  try {
    const restaurantCollectionRef = collection(ChungstaurantFirestore, 'RestaurantData');

    let restaurantQuery;

    const filters = [];

    if (searchParams?.type) {
      console.log(searchParams.type);
      filters.push(where('tagList', 'array-contains', searchParams.type));
    }

    if (searchParams?.search) {
      console.log(searchParams.search);
      filters.push(where('restaurantName', '>=', searchParams.search));
      filters.push(where('restaurantName', '<=', searchParams.search + '\uf8ff'));
    }

    if (pageParam) {
      restaurantQuery = query(
        restaurantCollectionRef,
        orderBy("id"),
        startAfter(pageParam),
        ...filters,
        limit(12)
      );
    } else {
      restaurantQuery = query(
        restaurantCollectionRef,
        orderBy("id"),
        ...filters,
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
