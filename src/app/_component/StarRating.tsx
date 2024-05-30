import styles from "@/app/_component/restaurant.module.css";

type Props = {
    size: String;
}

export default function StarRating({ size }: Props) {
    return (
        <div className={styles.starRatings} style={{fontSize: `${size}`}}>
            <div className={styles.fillStars} style={{width: "80%"}}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div className={styles.baseStars}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
        </div>
    )
}