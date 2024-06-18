import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

// 특정 음식점에 대한 리뷰 데이터의 starRate 평균을 계산
export default async function calculateAverageStarRate(restaurantId: number) {
    try {
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

        const resultstaraver = reviewCount === 0 ? 0 : totalStarRate / reviewCount;

        // 특정 restaurantId만 쿼리
        const resCollection = collection(ChungstaurantFirestore, 'RestaurantData');
        const resupdateQuery = query(resCollection, where("id", "==", restaurantId));
        const resQuerySnapshot = await getDocs(resupdateQuery);

        // 문서 업데이트
        const updatePromises = resQuerySnapshot.docs.map(async (resDoc) => {
            const resDocRef = doc(ChungstaurantFirestore, 'RestaurantData', resDoc.id);
            await updateDoc(resDocRef, { starAverage: resultstaraver.toFixed(1) });
        });

        await Promise.all(updatePromises);
        console.log(`Successfully updated starAverage for restaurantId ${restaurantId}`);
    } catch (error) {
        console.error("Error updating starAverage: ", error);
    }
}
