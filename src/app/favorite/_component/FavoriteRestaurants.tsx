"use client";

import { useAuth } from "@/hooks/useAuth";
import { Restaurant as IRestaurant } from "@/model/Restaurant";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import getUserLikedRestaurants from "../_lib/getUserLikedRestaurantsInfinity";
import { Fragment } from "react";
import Restaurant from "@/app/_component/Restaurant";

export default function FavoriteRestaurants() {
    const { user, loading } = useAuth();
    const { data, fetchNextPage } = useInfiniteQuery<
        IRestaurant[],
        Object,
        InfiniteData<IRestaurant[]>,
        [_1: string, userEmail: string],
        number
    >({
        queryKey: ["restaurants", user?.email as string],
        queryFn: getUserLikedRestaurants,
        initialPageParam: 0,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        getNextPageParam: (lastPage, pages) => {
            return lastPage?.at(-1)?.id;
        },
    });

    return (
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((restaurant) => (
                        <Restaurant
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </Fragment>
            ))}
        </>
    );
}
