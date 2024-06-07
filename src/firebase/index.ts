// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, serverTimestamp  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
=======
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
>>>>>>> 6606095 (메인 화면 데이터 불러오기)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Analytics 지원 여부 확인
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(firebaseApp);
    console.log("Firebase Analytics 초기화 완료.");
  } else {
    console.log("Firebase Analytics가 이 환경에서 지원되지 않습니다.");
  }
}).catch((error) => {
  console.error("Firebase Analytics 지원 여부 확인 중 오류 발생:", error);
});

export const ChungstaurantFirestore = getFirestore(firebaseApp);
<<<<<<< HEAD
export { serverTimestamp, auth, storage };
=======
export { auth };
>>>>>>> 6606095 (메인 화면 데이터 불러오기)
