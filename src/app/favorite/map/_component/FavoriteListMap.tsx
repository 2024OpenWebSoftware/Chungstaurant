//즐겨찾기 목록 지도 표시

"use client";

import React, { useEffect, useState } from "react";
import {
    Map,
    MapMarker,
    MarkerClusterer,
    CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { getCoordinatesFromAddress } from "../../../_lib/transitionToCoordinates";
import Script from "next/script";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Restaurant as IRestaurant } from "@/model/Restaurant";
import getUserLikedRestaurants from "../../_lib/getUserLikedRestaurants";

interface Place {
    lat: number;
    lng: number;
    address: string;
    name: string; // 음식점 이름 필드 추가
}

const FavoriteList = () => {
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
    const [places, setPlaces] = useState<Place[]>([]);
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const fetchLikedRestaurants = async () => {
            try {
                if (data) {
                    // 음식점 주소를 위도/경도로 변환
                    const addressPromises = data?.map((restaurantData) => {
                        if (restaurantData && restaurantData.address) {
                            return getCoordinatesFromAddress(
                                restaurantData.address
                            ).then((coord) => ({
                                ...coord,
                                address: restaurantData.address,
                                name: restaurantData.restaurantName,
                            }));
                        }
                        return null;
                    });

                    const placesData = (
                        await Promise.all(addressPromises)
                    ).filter((place) => place !== null);

                    setPlaces(placesData as Place[]);
                    console.log("Coordinates fetched:", placesData);
                }
            } catch (error) {
                console.error("Error fetching liked restaurants:", error);
            }
        };

        if (isMapLoaded) {
            fetchLikedRestaurants();
        }
    }, [data, isMapLoaded]);

    useEffect(() => {
        if (map && places.length) {
            const bounds = new kakao.maps.LatLngBounds();
            places.forEach((place) => {
                bounds.extend(new kakao.maps.LatLng(place.lat, place.lng));
            });
            map.setBounds(bounds);
            console.log("Map bounds set with places:", places);
        }
    }, [map, places]);

    const handleMapCreate = (map: kakao.maps.Map) => {
        setMap(map);
        setIsMapLoaded(true);
        console.log("Map created:", map);
    };

    return (
        <>
            <Script
                strategy="beforeInteractive"
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services,clusterer,drawing`}
            />
            <Map
                center={{ lat: 36.628503, lng: 127.456973 }}
                style={{ width: "100%", height: "900px" }}
                level={4}
                onCreate={handleMapCreate}
            >
                {places.length > 0 && (
                    <MarkerClusterer averageCenter={true} minLevel={10}>
                        {places.map((place, index) => (
                            <React.Fragment key={index}>
                                <MapMarker
                                    position={{
                                        lat: place.lat,
                                        lng: place.lng,
                                    }}
                                />
                                <CustomOverlayMap
                                    position={{
                                        lat: place.lat,
                                        lng: place.lng,
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "5px",
                                            backgroundColor: "white",
                                            fontWeight: "bold",
                                            border: "1px solid black",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        {place.name}
                                    </div>
                                </CustomOverlayMap>
                            </React.Fragment>
                        ))}
                    </MarkerClusterer>
                )}
            </Map>
        </>
    );
};

export default FavoriteList;
