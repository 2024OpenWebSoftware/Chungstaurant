import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement('script');
              script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services&autoload=false';
              document.body.appendChild(script);
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}