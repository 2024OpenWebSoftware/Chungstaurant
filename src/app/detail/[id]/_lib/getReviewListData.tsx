import { collection, getDocs, query, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

// 해당 음식점에 대한 리뷰 목록 불러오기
export default async function getReviewListData(resId: string) { // resId : 해당 음식점의 리뷰 목록을 불러오기위한 음식점 Id
  try {
    const reviewListDataCollectionRef = collection(ChungstaurantFirestore, 'ReviewListData');

    let reviewListDataQuery;

    if (resId) {
      reviewListDataQuery = query(reviewListDataCollectionRef, where('restaurantName', 'array-contains', resId));
    } else {
      reviewListDataQuery = reviewListDataCollectionRef;
    }

    const reviewListDataSnap = await getDocs(reviewListDataQuery); // 쿼리를 실행하여 결과를 가져옵니다.
    const data = reviewListDataSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    return data;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return [];
  }
}
