'use client'
import { AuthProvider } from '@/context/AuthContext';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { User, ShoppingCart, SignIn } from "@phosphor-icons/react/dist/ssr";
import HeaderSearchBar from "../header-search-bar/HeaderSearchBar";
import { useAuthContext } from "@/context/AuthContext";
import { cart as cartItem } from "@/database/cart";

const isSignedIn = true;

export default function Header() {
  const { user, logout, loading } = useAuthContext(); // Use auth context
  const isSignedIn = !!user;
  
  
  return (
    <header className="w-full h-20 block">
      <div className="max-w-screen-xl h-full mx-auto flex flex-row gap-10 justify-between items-center px-4">
        <Link href={`/`}>
          <Image
            src="/iontech.svg"
            alt="Next.js logo"
            width={156}
            height={48}
            priority
          />
        </Link>
        <HeaderSearchBar />
        <div className="flex flex-row gap-3">
          <Link href={`/cart/${cartItem[0].cartId}`}>
            <Button isIconOnly variant="light">
              <ShoppingCart size={24} />
            </Button>
          </Link>
          {
            isSignedIn ? (
              <Link href={`/profile`}>
                <Button
                  variant="ghost"
                  startContent={<User size={20} />}
                >
                  Tài khoản
                </Button>
              </Link>
            ) : (
              <Link href={`/sign-in`}>
                <Button
                  variant="light"
                  startContent={<SignIn size={20} />}
                >
                  Đăng nhập
                </Button>
              </Link>
            )
          }
        </div>
      </div>
    </header>
  )
}
