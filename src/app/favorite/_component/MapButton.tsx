"use client";

import { useRouter } from 'next/navigation';
import styles from "../../page.module.css";

export default function MapButton() {
    const router = useRouter();
    const onClick = () => {
        router.push("/favorite/map");
    }

    return (
        <button className={styles.mapButton} onClick={onClick}>지도 보기</button>
    );
}