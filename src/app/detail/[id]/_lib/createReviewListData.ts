import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ChungstaurantFirestore, serverTimestamp } from "@/firebase";
import uploadImage from './uploadImage'; // 이미지 업로드 함수 가져오기

/* 
1. resId = 음식점 id
2. email = 유저 이메일
3. starRate = 별점
4. rContent = 리뷰 내용
5. imgPath = 이미지(선택사항)
6. timestamp = 작성시간
*/
export default async function createReviewListData (resId: number, email: string ,starRate: number, rContent: string, inputImage?: File)  {
    try{
        let inputimgPath = null;

        if (inputImage) {
            inputimgPath = await uploadImage(inputImage); // 이미지 업로드 후 다운로드 URL 받기
        }

        // resId를 기반으로 고유한 reviewId 생성
        const reviewQuery = query(collection(ChungstaurantFirestore, 'ReviewListData'), where("restaurantId", "==", resId));
        const querySnapshot = await getDocs(reviewQuery);
        const reviewId = querySnapshot.size + 1; // 해당 resId에 대한 리뷰 수를 기반으로 reviewId 생성

        // email을 기반으로 유저정보를 찾은뒤 id 필드값 갔고오기
        const emailQuery = query(collection(ChungstaurantFirestore, 'Users'), where("email", "==", email));
        const userquerySnapshot = await getDocs(emailQuery);
        
        if (userquerySnapshot.empty) {
            throw new Error("해당 이메일을 가진 유저를 찾을 수 없습니다.");
        }

        const userDoc = userquerySnapshot.docs[0];
        const userId = userDoc.data().id;

        resId = Number(resId);

        await addDoc(collection(ChungstaurantFirestore, 'ReviewListData'),
        {
            reviewId: reviewId,
            restaurantId: resId,
            userId: userId,
            starRate: starRate,
            rContent: rContent,
            imgPath: inputimgPath || null,  // imgPath가 선택 사항이므로, 제공되지 않으면 null로 설정
            timestamp: serverTimestamp() // Firestore의 서버 타임스탬프 사용
        })
        
        console.log("리뷰를 성공적으로 추가했습니다!");
    } catch(error){
        console.error("Error adding review: ", error);
    }
}
