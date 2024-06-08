//즐겨찾기 목록 가져오기

import { collection, query, where, getDocs } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

export default async function getUserLikedRestaurants(useremail: string): Promise<string[]> {
    const usersCollectionRef = collection(ChungstaurantFirestore, "Users");
    const userQuery = query(usersCollectionRef, where('email', '==', useremail));
    const querySnapshot = await getDocs(userQuery);

    let likedRestaurants: string[] = [];

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.likeRestaurant) {
            likedRestaurants = userData.likeRestaurant;
        }
    });

    return likedRestaurants;
}
