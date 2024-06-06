import { collection, getDocs } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

// 특정 음식점에 대한 리뷰 데이터의 starRate 평균을 계산
async function calculateAverageStarRate(restaurantId: string) {
    const reviewCollection = collection(ChungstaurantFirestore, 'ReviewListData');
    const querySnapshot = await getDocs(reviewCollection);

    let totalStarRate = 0;
    let reviewCount = 0;

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.restaurantId === restaurantId) {
            totalStarRate += data.starRate;
            reviewCount += 1;
        }
    });

    return reviewCount === 0 ? 0 : totalStarRate / reviewCount;
}
