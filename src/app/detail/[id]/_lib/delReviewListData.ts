import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

/*
1. resId : 해당 음식점의 리뷰를 삭제하기 위한 음식점 Id
2. userId : 해당 음식점의 리뷰를 삭제하기 위한 사용자 Id
*/

// 해당 음식점에 대한 리뷰 삭제하기
export default async function delReviewListData(reviewId: number, resId: number, userId: string) { 
  try {
    const reviewListDataCollectionRef = collection(ChungstaurantFirestore, 'ReviewListData');

    // reviewId, restaurantId, userId가 일치하는 문서를 찾기 위한 쿼리 생성
    const reviewListDataQuery = query(
      reviewListDataCollectionRef,
      where('reviewId', '==', reviewId),
      where('restaurantId', '==', resId),
      where('userId', '==', userId)
    );

    // 쿼리를 실행하여 결과를 가져옵니다.
    const reviewListDataSnap = await getDocs(reviewListDataQuery);

    // 해당 조건에 맞는 모든 문서를 삭제합니다.
    const deletePromises = reviewListDataSnap.docs.map(doc => deleteDoc(doc.ref));

    // 모든 삭제 작업이 완료되기를 기다립니다.
    await Promise.all(deletePromises);

    console.log('Successfully deleted matching reviews.');
  } catch (error) {
    console.error('Error fetching delete documents: ', error);
  }
}
