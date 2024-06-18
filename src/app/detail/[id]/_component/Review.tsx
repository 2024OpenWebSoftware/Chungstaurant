"use client";

import styles from "./review.module.css";
import ProfileImage from "../../../../../public/profile.jpeg";
import Image from "next/image";
import StarRating from "@/app/_component/StarRating";
import { Review as IReview } from "@/model/Review";
import { useAuth } from '@/hooks/useAuth';
import getUserIdFromEmail from '../_lib/getUserIdFromEmail';
import { useState, useEffect } from "react";
import delReviewListData from '../_lib/delReviewListData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
    review: IReview;
};

export default function Review({ review }: Props) {
    const queryClient = useQueryClient();
    const { user, loading } = useAuth();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const onClickDelete = () => {
        let result = confirm("정말로 리뷰를 삭제하시겠습니까?");

        if(result) {
            reviewDelete.mutate({reviewId: review.reviewId, resId: review.restaurantId, userId: currentUserId as string}); 
            alert("리뷰가 정상적으로 삭제되었습니다.");
        }
    }

    const reviewDelete = useMutation({
        mutationFn: ({ reviewId, resId, userId }: {reviewId: number, resId: number, userId: string}) => {
            return delReviewListData(reviewId, resId, userId);
        },
        onSuccess() {
            const reviewResId = review.restaurantId.toString();
            queryClient.invalidateQueries({queryKey: ["reviews", reviewResId]})
        }
    });

    useEffect(() => {
        async function fetchUserId() {
            if (user?.email) {
                const userId = await getUserIdFromEmail(user?.email);
                setCurrentUserId(userId);
            }
        }

        fetchUserId();
    }, [user]);

    return (
        <div className={styles.reviewWrapper}>
            <div className={styles.userInfo}>
                <Image
                    width={64}
                    height={64}
                    src={ProfileImage}
                    alt="프로필사진"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                        {review.userId}
                    </div>
                    <StarRating starAverage={review.starRate} size="18px" />
                </div>
            </div>
            <div className={styles.review}>{review.rContent}</div>
            <div className={styles.imageSection}>
                {review.imgPath && (
                    <Image
                        src={review.imgPath}
                        width={300}
                        height={200}
                        alt="리뷰이미지"
                    />
                )}
            </div>
            {currentUserId === review.userId && (
                <button className={styles.deleteButton} onClick={onClickDelete}>리뷰 삭제</button>
            )}
        </div>
    );
}