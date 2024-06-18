"use client";

import { useEffect } from 'react';
import AiFillStar from './AiFillStar';
import styles from "../page.module.css";
import cx from "classnames";
import { useModalStore } from '@/store/modal';

export default function ReviewRating() {
    const starArray = [0, 1, 2, 3, 4];
    const modalStore = useModalStore();
    const onStarClick = (index: number) => {
        let clickStates: boolean[] = [...modalStore.clicked];
        for(let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        modalStore.setClicked(clickStates);
    }

    useEffect(() => {
      modalStore.resetClicked();
    }, []);
    

    return (
        <div>
            {starArray.map((el) => {
                return (
                    <AiFillStar key={el} onClick={() => onStarClick(el)} className={cx(modalStore.clicked[el] && styles.yellowStars)} />
                )
            })}
        </div>
    );
}