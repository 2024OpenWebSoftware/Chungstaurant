/*
1.  리뷰 이미지 업로드 용 기능
2.  uploadBytes 메서드를 이용하여 파일을 올릴 수 있지만, 
    만약 현재 올릴 파일 이름과 스토리지에 있는 파일 이름이 겹친다면, 
    파일을 업로드 했을시 기존에 있는 파일이 사라지는 문제가 생길 수 있음
    이런 문제점을 해결하기 위해 UUID 라이브러리를 사용하여 스토리지에 
    저장할 파일 이름을 고유한 Key 값을 랜덤하게 만들어서 부여해주면 
    업로드할 파일 이름 중복 문제를 해결 할 수 있음.
3. Next.js 컴포넌트에서 이미지 업로드 기능 구현 필요
*/
import { v4 as uuid } from "uuid";					//v4 버전 사용
import { ref, uploadBytes, } from "firebase/storage";
import { storage } from "@/firebase";

export default async function uploadReviewImage(inputImage: File){

    const uploadFileName = uuid() + ".png";			// uuid를 통해 파일 이름 랜덤으로 뽑기

    if (inputImage === null) return;

    const imageRef = ref(storage, `images/${uploadFileName}`);		// images 폴더에 저장
    
    try {
        const snapshot = await uploadBytes(imageRef, inputImage);
        console.log('Uploaded a blob or file!', snapshot);
        return snapshot;
      } catch (error) {
        console.error('Error uploading image: ', error);
        throw error;
      }
}
    