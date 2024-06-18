"use client";

import { useAuth } from "@/hooks/useAuth";
import { Restaurant as IRestaurant } from "@/model/Restaurant";
import { useQuery } from "@tanstack/react-query";
import Restaurant from "@/app/_component/Restaurant";
import getUserLikedRestaurants from "../_lib/getUserLikedRestaurants";

export default function FavoriteRestaurants() {
    const { user, loading } = useAuth();

    const { data } = useQuery<
        IRestaurant[],
        Object,
        IRestaurant[],
        [_1: string, userEmail: string]
    >({
        queryKey: ["restaurants", user?.email as string],
        queryFn: getUserLikedRestaurants,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return (
        <>
            {data?.map((restaurant) => (
                <Restaurant key={restaurant.id} restaurant={restaurant} />
            ))}
        </>
    );
}
