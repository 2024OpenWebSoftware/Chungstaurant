"use client";

import Link from "next/link";
import styles from "./hamburgerMenu.module.css";
import { useModalStore } from "@/store/modal";
import { useAuth } from "@/hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function HamburgerMenu() {
    const router = useRouter();
    const modalStore = useModalStore();
    const { user, loading } = useAuth();
    const auth = getAuth();
    const onClick = () => {
        modalStore.setVisible(false);
    };
    const onClickLogout = () => {
        signOut(auth)
            .then(() => {
                modalStore.setVisible(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className={styles.menuWrapper}>
            <Link href="/" onClick={onClick}>홈</Link>
            <Link href="/favorite" onClick={onClick}>내가 좋아하는 식당들</Link>
            {!user ? (
                <>
                    <Link href="/login" onClick={onClick}>로그인</Link>
                    <Link href="/signup" onClick={onClick}>회원가입</Link>
                </>
            ) : (
                <Link href="#" onClick={onClickLogout}>
                    로그아웃
                </Link>
            )}
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
