import { collection, query, where, getDocs, limit, startAfter } from "firebase/firestore";
import { ChungstaurantFirestore } from "../../../firebase";
import { Restaurant } from "../../../model/Restaurant";

type Props = {
    queryKey: [_1: string, userEmail: string]
}

export default async function getUserLikedRestaurants({ queryKey }: Props) {
    const [_1, userEmail] = queryKey;
 
    const usersCollectionRef = collection(ChungstaurantFirestore, "Users");
    const userQuery = query(usersCollectionRef, where('email', '==', userEmail));
    const userQuerySnapshot = await getDocs(userQuery);
    let restaurantQuery;

    let likedRestaurants: number[] = [];

    userQuerySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.likeRestaurant) {
            likedRestaurants = userData.likeRestaurant;
        }
    });

    if (likedRestaurants?.length === 0) {
        return [];
    }

    const restaurantDataCollectionRef = collection(ChungstaurantFirestore, "RestaurantData");

    restaurantQuery = query(restaurantDataCollectionRef, where('id', 'in', likedRestaurants));

    const restaurantQuerySnapshot = await getDocs(restaurantQuery);

    const likedRestaurantData: Restaurant[] = [];
    restaurantQuerySnapshot.forEach((doc) => {
        likedRestaurantData.push(doc.data() as Restaurant);
    });

    return likedRestaurantData;
}