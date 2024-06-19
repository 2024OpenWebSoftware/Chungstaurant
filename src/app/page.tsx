import {
    HydrationBoundary,
    InfiniteData,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import styles from "./page.module.css";
import getRestaurants from "./_lib/getRestaurants";
import Restaurants from "./_component/Restaurants";
import FoodTypes from "./_component/FoodTypes";
import { Restaurant } from '@/model/Restaurant';

type Props = {
    searchParams: { type?: string; search?: string };
};

export default async function Home({ searchParams }: Props) {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery<Restaurant[], Object, InfiniteData<Restaurant[]>, [_1: string, _2: Props["searchParams"]], number>({
        queryKey: ["restaurants", searchParams],
        queryFn: getRestaurants,
        initialPageParam: 0,
    });
    const dehydrateState = dehydrate(queryClient);

    return (
        <main className={styles.main}>
            <h1>우리 오늘 뭐 먹니?</h1>
            <h2>충북대학교 주변 먹을만한 식당들을 소개합니다.</h2>
            <div
                style={{
                    marginTop: "32px",
                    marginBottom: "24px",
                    fontWeight: "800",
                }}
            >
                음식 종류
            </div>
            <FoodTypes />
            <HydrationBoundary state={dehydrateState}>
                <div className={styles.restaurantWrapper}>
                    <Restaurants searchParams={searchParams} />
                </div>
            </HydrationBoundary>
        </main>
    );
}
