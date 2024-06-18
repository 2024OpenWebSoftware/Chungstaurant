import styles from "./page.module.css";
import RestaurantInfo from './_component/RestaurantInfo';
import ReviewRating from './_component/ReviewRating';
import ReviewPostForm from './_component/ReviewPostForm';
import Reviews from './_component/Reviews';

type Props = {
    params: { id: number };
}

export default function DetailPage({ params }: Props) {
    return (
        <main className={styles.main}>
            <RestaurantInfo id={params.id} />
            <h2 style={{ marginTop: "64px" }}>리뷰</h2>
            <div className={styles.stars}>
                <ReviewRating />
            </div>
            <ReviewPostForm resId={params.id} />
            <Reviews id={params.id} />
        </main>
    );
}
