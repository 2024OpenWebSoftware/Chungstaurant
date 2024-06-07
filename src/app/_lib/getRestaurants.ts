<<<<<<< HEAD
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

export default async function getRestaurants(tagParam?: string) {
=======
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";
import { Restaurant } from '@/model/Restaurant';

type Props = {
  pageParam?: number;
};

export default async function getRestaurants({ pageParam }: Props) {
>>>>>>> 6606095 (메인 화면 데이터 불러오기)
  try {
    const restaurantCollectionRef = collection(ChungstaurantFirestore, 'RestaurantData');

    let restaurantQuery;

<<<<<<< HEAD
    if (tagParam) {
      restaurantQuery = query(restaurantCollectionRef, where('tagList', 'array-contains', tagParam));
    } else {
      restaurantQuery = restaurantCollectionRef;
    }

    const restaurantListSnap = await getDocs(restaurantQuery); // 쿼리를 실행하여 결과를 가져옵니다.
    const data = restaurantListSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id // <-여기의 id는 꼭 getRestaurntData(), createReviewListData(), getReviewListData()에 넘겨주어야함
=======
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
>>>>>>> 6606095 (메인 화면 데이터 불러오기)
    }));

    return data;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return [];
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 6606095 (메인 화면 데이터 불러오기)
