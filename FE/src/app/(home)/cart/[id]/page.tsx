import type { Metadata } from "next";
import CartPage from "./cart-page";
import { cart } from "@/database/cart";

const cartItem = cart[0].cartItem;

export const metadata: Metadata = {
  title: "Giỏ hàng của tôi | IonTech",
  description: "Xem và quản lý các sản phẩm trong giỏ hàng của bạn.",
}

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const { id } =  params;
  return <CartPage cartId={id} cartItem={cartItem}/>;
}