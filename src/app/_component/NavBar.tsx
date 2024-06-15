"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/layout.module.css";
import Logo from "../../../public/충스토랑.png";
import HamburgerMenu from "./HamburgerMenu";
import { useModalStore } from "@/store/modal";
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NavBar() {
    const modalStore = useModalStore();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const searchParams = useSearchParams();
    const onChangeSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue(e.target.value);
    }
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter') {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("search", searchValue);
            router.push(`/?${newSearchParams.toString()}`);
        }
    }
    const onClick = () => {
        modalStore.setVisible(true);
    };

    return (
        <>
            <header className={styles.navBarWrapper}>
                <section className={styles.navBar}>
                    <Link href="/" className={styles.logo}>
                        <Image src={Logo} alt="충스토랑" width={120} />
                    </Link>
                    <div className={styles.searchForm}>
                        <input type="text" className={styles.searchInput} value={searchValue} onChange={onChangeSearchInput} onKeyDown={onKeyDown} />
                        <svg
                            fill="#000000"
                            height="18px"
                            width="18px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 488.4 488.4"
                            xmlSpace="preserve"
                            className={styles.searchIcon}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <g>
                                        <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <button
                        className={styles.hamburgerButton}
                        onClick={onClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="27"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#33363f"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-menu"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </section>
            </header>
            {modalStore.visible && <HamburgerMenu />}
        </>
    );
}
