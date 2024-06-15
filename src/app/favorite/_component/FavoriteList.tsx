//즐겨찾기 목록 지도 표시

"use client";

import React, { useEffect, useState } from "react";
import {
    Map,
    MapMarker,
    MarkerClusterer,
    CustomOverlayMap,
} from "react-kakao-maps-sdk";
import getUserLikedRestaurants from "../_lib/getUserLikedRestaurants";
import { getCoordinatesFromAddress } from "../../_lib/transitionToCoordinates";
import Script from "next/script";
import getRestaurantDataNoReactQuery from '../_lib/getRestaurantDataNoReactQuery';

interface Place {
    lat: number;
    lng: number;
    address: string;
    name: string; // 음식점 이름 필드 추가
}

interface FavoriteListProps {
    useremail: string;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ useremail }) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const fetchLikedRestaurants = async () => {
            try {
                // 유저의 좋아요한 음식점 ID 리스트 가져오기
                const likedRestaurantIds = await getUserLikedRestaurants(
                    useremail
                );
                console.log("Liked restaurant IDs:", likedRestaurantIds);

                // 각 음식점 ID에 대한 데이터 가져오기
                const restaurantDataPromises = likedRestaurantIds.map(id => getRestaurantDataNoReactQuery(id));

                const restaurantDataArray = await Promise.all(
                    restaurantDataPromises
                );

                console.log("Restaurant data:", restaurantDataArray);

                // 음식점 주소를 위도/경도로 변환
                const addressPromises = restaurantDataArray.map(
                    (restaurantData) => {
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
                    }
                );

                const placesData = (await Promise.all(addressPromises)).filter(
                    (place) => place !== null
                );

                setPlaces(placesData as Place[]);
                console.log("Coordinates fetched:", placesData);
            } catch (error) {
                console.error("Error fetching liked restaurants:", error);
            }
        };

        if (isMapLoaded) {
            fetchLikedRestaurants();
        }
    }, [useremail, isMapLoaded]);

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
                style={{ width: "100%", height: "500px" }}
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
                                            border: "1px solid black",
                                            borderRadius: "3px",
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
