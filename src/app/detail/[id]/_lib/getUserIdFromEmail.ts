import { ChungstaurantFirestore } from '@/firebase';
import { User } from '@/model/User';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function getUserIdFromEmail(email : string) {
    const usersCollectionRef = collection(
        ChungstaurantFirestore,
        "Users"
    );
    const usersDataQuery = query(usersCollectionRef, where("email", "==", email));
    const usersDataSnap = await getDocs(usersDataQuery);

    if(usersDataSnap.empty) {
        return null;
    }

    const firstUserData = usersDataSnap.docs[0].data() as User;
    return firstUserData.id;
}