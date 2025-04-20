'use client';
import './globals.css';
import { Manrope } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from '@/context/AuthContext'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-manrope',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <GoogleOAuthProvider clientId="218670822321-gn8cedd6dhggov0gv38gnq3itm5ll6b9.apps.googleusercontent.com">
          <AuthProvider> {/* Bọc AuthProvider bên trong GoogleOAuthProvider */}
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}