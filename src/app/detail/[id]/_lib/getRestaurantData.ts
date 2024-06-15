import { collection, query, where, getDocs } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";
import { Restaurant } from '@/model/Restaurant';

type Props = {
    queryKey: [_1: string, _2: number]
}

export default async function getRestaurantData({ queryKey }: Props) {
    const [_1, id] = queryKey;

    const numericId = Number(id);

    try {
        const restaurantCollectionRef = collection(ChungstaurantFirestore, "RestaurantData");
        const q = query(restaurantCollectionRef, where("id", "==", numericId));
        const querySnapshot = await getDocs(q); // 쿼리 결과를 가져오기 - 비동기처리;

        if (!querySnapshot.empty) {
            // 첫 번째 문서만 반환
            const doc = querySnapshot.docs[0];
            return doc.data() as Restaurant;
        } 
    } catch (error) {
        console.log(error);  
    }

    return null;
}
