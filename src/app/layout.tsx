import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@ui/themes/theme-provider";
import {fetchThemeData} from "@ui/bootstrap-data/fetch-settings-data";
import {BootstrapProvider} from "@ui/bootstrap-data/bootstrap-provider";
import {BootstrapData} from "@ui/bootstrap-data/bootstrap-data";

export default async function RootLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const bootstrapData:BootstrapData | null = await fetchThemeData();

    return (
        <html lang="en">
        <body className={'text-text-main'}>
        <BootstrapProvider data={bootstrapData}>
            <ThemeProvider>{children}</ThemeProvider>
        </BootstrapProvider>
        </body>
        </html>
    );
}
