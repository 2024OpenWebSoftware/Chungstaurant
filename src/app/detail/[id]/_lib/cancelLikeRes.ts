/*
1. 음식점 detail 페이지에서 하트표시(좋아요 표시) 누른거 취소
2. 해당 음식점 id 받아와서 Users 컬렉션 내부에서 하트 누른 유저 document 로 들어가서 like 필드(배열)에 해당 음식점 id 삭제

<Firebase Firestore 구조>
Users 컬렉션
ㄴ 문서 id(자동 생성)
    ㄴ email : 유저 이메일(아이디로 기능)
    ㄴ id : 유저 닉네임
    ㄴ likeRestaurant[] : 하트 클릭취소한 음식점 id(배열로) 삭제

*/ 
import { collection, query, where, getDocs, updateDoc, arrayRemove } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

export default async function cancelLikeRes(resId: string, useremail: string){
    const usersCollectionRef = collection(ChungstaurantFirestore, "Users");
    
    // 유저의 이메일로 문서 쿼리
    const userQuery = query(usersCollectionRef, where('email', '==', useremail));
    const querySnapshot = await getDocs(userQuery);

    // 쿼리 결과에서 유저 문서 가져오기
    querySnapshot.forEach(async (doc) => {
        // 유저 문서 참조
        const userDocRef = doc.ref;

        // likeRestaurant 배열 필드에서 resId 제거
        await updateDoc(userDocRef, {
            likeRestaurant: arrayRemove(resId)
        });
    });
};
