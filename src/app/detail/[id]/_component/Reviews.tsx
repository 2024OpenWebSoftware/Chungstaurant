"use client";

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import getReviewListData from '../_lib/getReviewListData';
import { Review as IReview } from '@/model/Review';
import { Fragment, useEffect } from 'react';
import Review from './Review';
import { useInView } from 'react-intersection-observer';

type Props = {
    id: number;
}

export default function Reviews({ id }: Props) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery<
        IReview[],
        Object,
        InfiniteData<IReview[]>,
        [_1: string, _2: number],
        number
    >({
        queryKey: ["reviews", id],
        queryFn: getReviewListData,
        initialPageParam: 0,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.at(-1)?.reviewId;
        },
    });

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    return (
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((review) =>
                        <Review key={review.reviewId} review={review} />
                    )}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: 50 }} />
        </>
    )
}