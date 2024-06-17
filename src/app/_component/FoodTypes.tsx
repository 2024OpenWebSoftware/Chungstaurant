"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../page.module.css";
import { MouseEvent } from 'react';

export default function FoodTypes() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClickFoodType = (type?: string) => (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(type) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("type", type);
            router.push(`/?${newSearchParams.toString()}`);
        } else {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("type");
            router.push(`/?${newSearchParams.toString()}`);
            router.refresh();
        }
    };

    return (
        <div className={styles.foodTypes}>
            <button className={styles.foodType} onClick={onClickFoodType()}>전체</button>
            <button className={styles.foodType} onClick={onClickFoodType("한식")}>한식</button>
            <button className={styles.foodType} onClick={onClickFoodType("일식")}>일식</button>
            <button className={styles.foodType} onClick={onClickFoodType("양식")}>양식</button>
            <button className={styles.foodType} onClick={onClickFoodType("중식")}>중식</button>
            <button className={styles.foodType} onClick={onClickFoodType("고기")}>고기</button>
            <button className={styles.foodType} onClick={onClickFoodType("분식")}>분식</button>
            <button className={styles.foodType} onClick={onClickFoodType("카페")}>카페</button>
            <button className={styles.foodType} onClick={onClickFoodType("치킨")}>치킨</button>
            <button className={styles.foodType} onClick={onClickFoodType("기타")}>기타</button>
        </div>
    );
}
