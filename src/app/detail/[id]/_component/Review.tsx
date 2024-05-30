import styles from "./review.module.css";
import ProfileImage from "../../../../../public/profile.jpeg";
import Image from 'next/image';
import StarRating from '@/app/_component/StarRating';

export default function Review() {
    return (
        <div className={styles.reviewWrapper}>
            <div className={styles.userInfo}>
                <Image width={64} height={64} src={ProfileImage} alt="프로필사진" />
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{fontWeight: "bold", marginBottom: "6px"}}>류정환</div>
                    <StarRating size="18px" />
                </div>
            </div>
            <div className={styles.review}>
                칵테일바였는데 주종 다양하고 안주도 맛있었어서 추천이에요!! 다음에 또 가고싶은 곳!!
            </div>
            <div className={styles.imageSection}>
                <Image
                        src="https://d12zq4w4guyljn.cloudfront.net/750_750_20230912104151281_photo_d9db485df002.jpg"
                        width={300}
                        height={200}
                        alt="리뷰이미지"
                />
            </div>
        </div>
    );
}