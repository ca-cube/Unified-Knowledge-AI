import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "SecureKnowledge AI | Compliance-Grade Intelligence",
    description: "Governance-first, audit-traceable AI for regulated industries.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased compliance-grid min-h-screen">
                {children}
            </body>
        </html>
    );
}
