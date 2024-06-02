/* 
1. 해당 음식점에 대한 리뷰 작성
2. 리뷰 작성 시 해당 음식점 이름도 ReviewListData 컬렉션에 restaurantName 필드에 보내는 방법 생각하기
*/
import { collection, addDoc } from "firebase/firestore";
import { ChungstaurantFirestore } from "@/firebase";

/* 
1. resName = 음식점 이름
2. id = 유저 닉네임(이름)
3. starRate = 별점
4. rContent = 리뷰 내용
5. imgPath = 이미지(선택사항)
*/
export default async function createReviewListData (resName: string, id: string, starRate: number, rContent: string, imgPath?: string)  {
    try{
        await addDoc(collection(ChungstaurantFirestore, 'ReviewListData'),
        {
            restaurantName: resName,
            userId: id,
            starRate: starRate,
            rContent: rContent,
            imgPath: imgPath
        })
        console.log("Review successfully added!");
    } catch(error){
        console.error("Error adding review: ", error);
    }
}