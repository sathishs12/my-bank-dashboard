// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }



// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { AuthProvider } from "@/context/AuthContext"; // Import the AuthProvider

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "MyBank Dashboard",
//   description: "A simple banking dashboard",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
//         <AuthProvider> {/* Wrap everything in the AuthProvider */}
//           <Header />
//           <main className="flex-grow container mx-auto p-4 md:p-6">
//             {children}
//           </main>
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AGGridSetup from "@/components/AGGridSetup"; // <-- Import the new setup component
import AGGridTable from "@/components/AGGridTable/AGGridTable";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CBU-Bank Dashboard",
  description: "Advanced Banking Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        {/* This component runs the setup code before any page content */}
        <AGGridSetup />

        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {/* <AGGridTable /> */}
            <main className="flex-grow container mx-auto p-4 md:p-6">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}