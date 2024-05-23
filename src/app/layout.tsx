import NavBar from './_component/NavBar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en">
                <body style={{ margin: 0 }}>
                    <NavBar />
                    {children}
                </body>
            </html>
        </>
    );
}
