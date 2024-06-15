"use client";

import { useRouter } from 'next/navigation';
import styles from "./restaurant.module.css";
import StarRating from './StarRating';
import { Restaurant as IRestaurant } from '@/model/Restaurant';

type Props = {
    restaurant: IRestaurant;
}

export default function Restaurant({ restaurant }: Props) {
    const router = useRouter();

    const onClickImage = () => {
        router.push(`/detail/${restaurant.id}`);
    }

    return (
        <div className={styles.infoWrapper}>
            <div className={styles.foodImage} style={{backgroundImage: `url(${restaurant.image})`}} onClick={onClickImage}>
                <div className={styles.tags}>
                    {restaurant.tagList.map((tag, i) => (
                        <div key={i} className={styles.tag}>#{tag}</div>
                    ))}
                </div>
            </div>
            <div className={styles.restaurantName}>{restaurant.restaurantName}</div>
            <StarRating starAverage={restaurant.starAverage} size="18px" />
        </div>
    );
}