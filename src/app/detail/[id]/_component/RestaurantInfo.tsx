"use client";

import Image from "next/image";
import styles from "../page.module.css";
import KakaoMap from "@/app/_component/KakaoMap";
import StarRating from "@/app/_component/StarRating";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getRestaurantData from "../_lib/getRestaurantData";
import { Restaurant } from "@/model/Restaurant";
import getUserLikedRestaurants from "@/app/favorite/_lib/getUserLikedRestaurants";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from 'react';
import cx from "classnames";
import postLikeRestaurantId from '../_lib/postLikeRestaurantId';
import cancelLikeRes from '../_lib/cancelLikeRes';
import { User } from 'firebase/auth';

type Props = {
    id: number;
};

export default function RestaurantInfo({ id }: Props) {
    const queryClient = useQueryClient();
    const { user, loading } = useAuth();
    const [liked, setLiked] = useState(false);
    const { data, isFetching } = useQuery<
        Restaurant | null,
        Object,
        Restaurant | null,
        [_1: string, _2: number]
    >({
        queryKey: ["restaurants", id],
        queryFn: getRestaurantData,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    
    const { data: likedRestaurants } = useQuery<
        Restaurant[],
        Object,
        Restaurant[],
        [_1: string, userEmail: string]
    >({
        queryKey: ["restaurants", user?.email as string],
        queryFn: getUserLikedRestaurants,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    const like = useMutation({
        mutationFn: ({ restaurantId, userEmail }: { restaurantId: number, userEmail: string }) => {
            return postLikeRestaurantId(restaurantId, userEmail);
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["restaurants", user?.email as string]})
        }
    })

    const unlike = useMutation({
        mutationFn: ({ restaurantId, userEmail }: { restaurantId: number, userEmail: string }) => {
            return cancelLikeRes(restaurantId, userEmail);
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["restaurants", user?.email as string]})
        }
    })

    const onClick = () => {
        if(!liked) {
            setLiked(true);
            like.mutate({restaurantId: data?.id as number, userEmail: user?.email as string});
        } else {
            setLiked(false);
            unlike.mutate({restaurantId: data?.id as number, userEmail: user?.email as string});
        }
    }

    useEffect(() => {
        if (likedRestaurants && Array.isArray(likedRestaurants) && data) {
            setLiked(likedRestaurants.some((restaurant) => restaurant.id === data.id));
        }
    }, [likedRestaurants, data]);

    if (!isFetching) {
        return (
            <>
                <div className={styles.restaurantInfo}>
                    <Image
                        src={data?.image as string}
                        width={400}
                        height={280}
                        alt="식당이미지"
                    />
                    <div className={styles.otherInfo}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <h1>{data?.restaurantName}</h1>
                            <button className={styles.heartButton} onClick={onClick}>
                                <svg
                                    viewBox="0 0 24 24"
                                    className={cx(styles.heartButton, liked && styles.liked)}
                                    width={32}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.foodTypes}>
                            {data?.tagList.map((tag, i) => (
                                <button key={i} className={styles.foodType}>
                                    #{tag}
                                </button>
                            ))}
                        </div>
                        <div className={styles.ratingsInfo}>
                            <StarRating
                                starAverage={data?.starAverage as number}
                                size="36px"
                            />
                            <span style={{ marginLeft: "12px" }}>
                                {data?.starAverage}/5.0
                            </span>
                        </div>
                        <div className={styles.locInfo}>
                            <svg
                                fill="#000000"
                                height={18}
                                width={18}
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 297 297"
                                xmlSpace="preserve"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645 c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645 C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892 c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"></path>
                                        <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614 c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901 c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104 C179.265,127.948,165.464,141.901,148.5,141.901z"></path>
                                    </g>
                                </g>
                            </svg>
                            <span style={{ marginLeft: "9px" }}>
                                {data?.address}
                            </span>
                        </div>
                        <div className={styles.contactInfo}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                width={18}
                                height={18}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M5 7V5C5 3.89543 5.89543 3 7 3H13H19C20.1046 3 21 3.89543 21 5V7V17V19C21 20.1046 20.1046 21 19 21H13H7C5.89543 21 5 20.1046 5 19V17V7Z"
                                        stroke="#323232"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M16 12C16 13.6569 14.6569 15 13 15C11.3431 15 10 13.6569 10 12C10 10.3431 11.3431 9 13 9C14.6569 9 16 10.3431 16 12Z"
                                        stroke="#323232"
                                        strokeWidth="2"
                                    ></path>
                                    <path
                                        d="M9 21C9.42546 18.6928 10.52 18 13 18C15.48 18 16.5745 18.6425 17 20.9497"
                                        stroke="#323232"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    ></path>
                                    <path
                                        d="M3 7H5"
                                        stroke="#323232"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M3 17H5"
                                        stroke="#323232"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M3 12H5"
                                        stroke="#323232"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </g>
                            </svg>
                            <span style={{ marginLeft: "9px" }}>
                                {data?.tel}
                            </span>
                        </div>
                    </div>
                </div>
                <h2>위치 정보</h2>
                <KakaoMap address={data?.address as string} />
            </>
        );
    } else {
        return (
            <>
                <h2>위치 정보</h2>
                <KakaoMap address={data?.address as string} />
            </>
        );
    }
}
