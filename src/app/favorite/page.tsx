import styles from "../page.module.css";
import FavoriteRestaurants from './_component/FavoriteRestaurants';
import MapButton from './_component/MapButton';

export default function FavoritePage() {
    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1>내가 좋아하는 식당들</h1>
                <MapButton />
            </div>
            <div className={styles.restaurantWrapper}>
                <FavoriteRestaurants />
            </div>
        </main>
    );
}
