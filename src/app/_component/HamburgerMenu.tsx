"use client";

import Link from "next/link";
import styles from "./hamburgerMenu.module.css";
import { useModalStore } from '@/store/modal';

export default function HamburgerMenu() {
    const modalStore = useModalStore();
    const onClick = () => {
        modalStore.setVisible(false);
    }

    return (
        <div className={styles.menuWrapper}>
            <Link href="#">홈</Link>
            <Link href="#">내가 좋아하는 식당들</Link>
            <Link href="#">로그인</Link>
            <Link href="#">회원가입</Link>
            <button className={styles.closeButton} onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );
}
