"use client";

import { useRouter } from 'next/navigation';
import styles from "./restaurant.module.css";

export default function Restaurant() {
    const router = useRouter();

    const onClickImage = () => {
        router.push("/detail/1");
    }

    return (
        <div className={styles.infoWrapper}>
            <div className={styles.foodImage} onClick={onClickImage}>
                <div className={styles.tags}>
                    <div className={styles.tag}>
                        #양식
                    </div>
                    <div className={styles.tag}>
                        #중문
                    </div>
                </div>
            </div>
            <div className={styles.restaurantName}>쿠쉬</div>
            <div className={styles.starRatings}>
                <div className={styles.fillStars} style={{width: "80%"}}>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className={styles.baseStars}>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
            </div>
        </div>
    );
}