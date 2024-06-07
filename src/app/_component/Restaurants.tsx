"use client";

import { Restaurant as IRestaurant } from '@/model/Restaurant';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import getRestaurants from '../_lib/getRestaurants';
import { Fragment, useEffect } from 'react';
import Restaurant from './Restaurant';
import { useInView } from 'react-intersection-observer';

type Props = {
    searchParams: { type?: string; search?: string; };
};

export default function Restaurants({ searchParams }: Props) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isPending,
        isLoading,
        isError,
    } = useInfiniteQuery<
        IRestaurant[],
        Object,
        InfiniteData<IRestaurant[]>,
        [_1: string, _2: Props["searchParams"]],
        number
    >({
        queryKey: ["restaurants", searchParams],
        queryFn: getRestaurants,
        initialPageParam: 0,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        getNextPageParam: (lastPage, pages) => {
            // 예: 페이지 매개변수로 사용하려는 논리
            return lastPage.at(-1)?.id;
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
                    {page.map((restaurant) =>
                        <Restaurant key={restaurant.id} restaurant={restaurant} />
                    )}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: 50 }} />
        </>
    );
}