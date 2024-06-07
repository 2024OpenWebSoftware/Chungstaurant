import styles from "@/app/_component/restaurant.module.css";

type Props = {
    size: String;
    starAverage: Number;
}

export default function StarRating({ size, starAverage }: Props) {
    const fillWidth = `${(starAverage as number / 5) * 100}%`

    return (
        <div className={styles.starRatings} style={{fontSize: `${size}`}}>
            <div className={styles.fillStars} style={{width: fillWidth}}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div className={styles.baseStars}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
        </div>
    )
}