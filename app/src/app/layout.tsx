import type { Metadata } from "next";
import ReactQueryProvider from "@/_components/ReactQueryProvider";

import { HeroUIProvider } from "@heroui/react";

import "@styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
    title: "DIMO Data Validator",
    description: "The DIMO Data Accuracy tool is a self-service platform to validate and report incorrect signal data from your DIMO vehicles.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className="overflow-hidden"
            >
                <ReactQueryProvider>
                    <HeroUIProvider>
                        {children}
                    </HeroUIProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}