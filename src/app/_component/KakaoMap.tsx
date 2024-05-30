"use client";

import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map 
        center={{ lat: 36.6331848773679, lng: 127.45894101295 }} 
        style={{ width: '500px', height: '300px' }}
        onCreate={(map) => {
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(36.6331848773679, 127.45894101295),
            map: map,
          });
        }}
      >
      </Map>
    </>
  );
};

export default KakaoMap;
