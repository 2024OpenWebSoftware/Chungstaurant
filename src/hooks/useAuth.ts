import { ChungstaurantFirestore, auth } from '@/firebase';
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface UserData {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    userData: UserData | null;
}

export const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if(user) {
            setUser(user);
            const userDoc = await getDoc(doc(ChungstaurantFirestore, "Users", user.uid));
            if(userDoc.exists()) {
                setUserData(userDoc.data() as UserData);
            }
        } else {
            setUser(null);
            setUserData(null);
        }
        setLoading(false);
      })
    
      return () => {
        unsubscribe();
      }
    }, []);
    
    return { user, loading, userData };
}