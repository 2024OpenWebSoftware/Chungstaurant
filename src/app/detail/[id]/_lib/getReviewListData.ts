import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";
import { Review } from '@/model/Review';

type Props = {
    queryKey: [_1: string, _2: number]
    pageParam?: number;
}

// 해당 음식점에 대한 리뷰 목록 불러오기
export default async function getReviewListData({ queryKey, pageParam }: Props) {
    const [_1, resId] = queryKey;

    // resId : 해당 음식점의 리뷰 목록을 불러오기위한 음식점 Id
    try {
        const reviewListDataCollectionRef = collection(
            ChungstaurantFirestore,
            "ReviewListData"
        );

        let reviewListDataQuery;

        if (resId) {
            let resIdNum = Number(resId);

            if(pageParam) {
                reviewListDataQuery = query(
                    reviewListDataCollectionRef,
                    startAfter(pageParam),
                    orderBy("reviewId", "desc"),
                    limit(8),
                    where("restaurantId", "==", resIdNum)
                );
            } else {
                reviewListDataQuery = query(
                    reviewListDataCollectionRef,
                    orderBy("reviewId", "desc"),
                    limit(8),
                    where("restaurantId", "==", resIdNum)
                );
            }
        } else {
            reviewListDataQuery = reviewListDataCollectionRef;
        }

        const reviewListDataSnap = await getDocs(reviewListDataQuery); // 쿼리를 실행하여 결과를 가져옵니다.
        const data: Review[] = reviewListDataSnap.docs.map((doc) => ({
            ...doc.data() as Review
        }));

        return data;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return [];
    }
}
