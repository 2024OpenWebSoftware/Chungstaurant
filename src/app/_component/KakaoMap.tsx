"use client";

import { Map } from "react-kakao-maps-sdk";
import { getCoordinatesFromAddress } from "../_lib/transitionToCoordinates";
import { useEffect, useState } from "react";
import Script from "next/script";

type Props = {
    address: string;
};

const KakaoMap = ({ address }: Props) => {
    const [coordinates, setCoordinates] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const result = await getCoordinatesFromAddress(address);
                setCoordinates(result);
            } catch (error) {
                console.error("Failed to fetch coordinates:", error);
            }
        };

        fetchCoordinates();
    }, [address]);

    if (!coordinates) {
        return (
            <>
                <Script
                    strategy="beforeInteractive"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services,clusterer,drawing`}
                />
                <Map
                    center={{ lat: 0, lng: 0 }}
                    style={{ width: "500px", height: "300px" }}
                    onCreate={(map) => {
                        const marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(0, 0),
                            map: map,
                        });
                    }}
                />
            </>
        );
    }
    return (
        <>
            <Script
                strategy="beforeInteractive"
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services,clusterer,drawing`}
            />
            <Map
                center={{ lat: coordinates.lat, lng: coordinates.lng }}
                style={{ width: "500px", height: "300px" }}
                onCreate={(map) => {
                    const marker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(
                            coordinates.lat,
                            coordinates.lng
                        ),
                        map: map,
                    });
                }}
            />
        </>
    );
};

export default KakaoMap;
