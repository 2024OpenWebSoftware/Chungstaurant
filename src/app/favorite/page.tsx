import Restaurant from "../_component/Restaurant";
import styles from "../page.module.css";
import MapButton from './_component/MapButton';

export default function FavoritePage() {
    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1>내가 좋아하는 식당들</h1>
                <MapButton />
            </div>
            <div className={styles.restaurantWrapper}>
                <Restaurant />
                <Restaurant />
                <Restaurant />
                <Restaurant />
                <Restaurant />
            </div>
        </main>
    );
}
