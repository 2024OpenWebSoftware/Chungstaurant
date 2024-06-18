import { collection, getDocs, query, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

// 특정 음식점에 대한 리뷰 데이터의 starRate 평균을 계산
export default async function calculateAverageStarRate(restaurantId: number) {
    // 특정 restaurantId에 대한 리뷰만 쿼리
    const reviewCollection = collection(ChungstaurantFirestore, 'ReviewListData');
    const restaurantQuery = query(reviewCollection, where("restaurantId", "==", restaurantId));
    const querySnapshot = await getDocs(restaurantQuery);

    let totalStarRate = 0;
    let reviewCount = 0;

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalStarRate += data.starRate;
        reviewCount += 1;
    });

    return reviewCount === 0 ? 0 : totalStarRate / reviewCount;
}
