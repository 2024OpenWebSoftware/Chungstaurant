import { collection, getDocs, query, where } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";
import { Restaurant } from '@/model/Restaurant';

export default async function getRestaurantDataNoReactQuery(id: number) {
    try {
        const restaurantCollectionRef = collection(
            ChungstaurantFirestore,
            "RestaurantData"
        );
        const q = query(restaurantCollectionRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);

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
