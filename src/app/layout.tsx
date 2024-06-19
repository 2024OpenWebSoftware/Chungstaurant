import { Suspense } from 'react';
import NavBar from './_component/NavBar';
import RQProvider from './_component/RQProvider';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en">
                <body style={{ margin: 0, display: "flex", justifyContent: "center" }}>
                    <RQProvider>
                        <NavBar />
                        <Suspense fallback={<div>Loading...</div>}>
                            {children}
                        </Suspense>
                    </RQProvider>
                </body>
            </html>
        </>
    );
}
