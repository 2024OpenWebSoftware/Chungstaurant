/* 
1. 해당 음식점에 대한 리뷰 작성
2. 리뷰 작성 시 해당 음식점 이름도 ReviewListData 컬렉션에 restaurantName 필드에 보내는 방법 생각하기
 ㄴ resId의 경우 detail/[id]/page에서 getRestaurantData()에서 나온 데이터에서 음식점 id를 넘겨주기
*/
import { collection, addDoc } from "firebase/firestore";
import { ChungstaurantFirestore, serverTimestamp } from "@/firebase";
import uploadImage from './uploadImage'; // 이미지 업로드 함수 가져오기

/* 
1. resId = 음식점 id
2. id = 유저 닉네임(이름)
3. starRate = 별점
4. rContent = 리뷰 내용
5. imgPath = 이미지(선택사항)
6. timestamp = 작성시간
*/
export default async function createReviewListData (resId: string, id: string, starRate: number, rContent: string, inputImage?: File)  {
    try{
        let inputimgPath = null;

        if (inputImage) {
            inputimgPath = await uploadImage(inputImage); // 이미지 업로드 후 다운로드 URL 받기
        }

        await addDoc(collection(ChungstaurantFirestore, 'ReviewListData'),
        {
            restaurantId: resId,
            userId: id,
            starRate: starRate,
            rContent: rContent,
            imgPath: inputimgPath || null,  // imgPath가 선택 사항이므로, 제공되지 않으면 null로 설정
            timestamp: serverTimestamp() // Firestore의 서버 타임스탬프 사용
        })
        
        console.log("Review successfully added!");
    } catch(error){
        console.error("Error adding review: ", error);
    }
}