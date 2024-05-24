import styles from "./restaurant.module.css";

export default function Restaurant() {
    return (
        <div className={styles.infoWrapper}>
            <div className={styles.foodImage}>
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
                <div className={styles.fillStars} style={{width: "75%"}}>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className={styles.baseStars}>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
            </div>
        </div>
    );
}