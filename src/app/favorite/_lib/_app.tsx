// src/app/_app.tsx

//카카오맵 로더
import Script from 'next/script';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`}
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Kakao Maps script loaded');
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
