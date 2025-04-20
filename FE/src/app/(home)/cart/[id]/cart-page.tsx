'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { CartTable, SummaryTable } from "./cart-table";
import { getCart } from "@/services/cartService";

const address = [
  {
    name: "Nguyễn Ngô Huy",
    phone_number: "0961808055",
    city: "Thành phố Hồ Chí Minh",
    district: "Quận 10",
    ward: "Phường 04",
    street: "282/31/5 Ngô Gia Tự",
    type: "Home",
  },
  {
    name: "Nguyễn Ngô Huy",
    phone_number: "0961808055",
    city: "Thành phố Hồ Chí Minh",
    district: "Quận 2",
    ward: "Phường An Khánh",
    street: "15 Trần Bạch Đằng",
    type: "Work",
  },
]

const paymentMethods = [
  { key: "cod", label: "Thanh toán khi nhận hàng" },
  { key: "banking", label: "Chuyển khoản ngân hàng" },
  { key: "momo", label: "Ví điện tử Momo" },
  { key: "zalopay", label: "Ví điện tử ZaloPay" },
  { key: "vnpay", label: "Ví điện tử VNPay" },
  { key: "paypal", label: "Ví điện tử Paypal" },
  { key: "creditcard", label: "Thẻ tín dụng" },
  { key: "debitcard", label: "Thẻ ghi nợ" },
]


type CartPageProps = {
  cartId: string;
  cartItem: {
    id: number;
    item: {
      itemNo: string;
      name: string;
      size: string;
      color: string;
      image: string;
      description: string;
    };
    price: number;
    quantity: number;
  }[];
};
export default function CartPage({ cartId, cartItem }: CartPageProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Set<string | number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.items || []); // tuỳ theo response
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="grid grid-cols-[5fr_2fr] gap-10">
      <section className="py-6 flex flex-col gap-6">
        <h3>Giỏ hàng của tôi - #{cartId}</h3>
        <div className="px-8 bg-[var(--card)] rounded-3xl shadow-medium">
          {loadingCart ? (
            <p className="text-center">Đang tải giỏ hàng...</p>
          ) : (
            <CartTable cartItem={cartItems} />
          )}
        </div>
      </section>

      <section>
        <div className="bg-[var(--card)] p-8 rounded-3xl flex flex-col gap-6">
          <h4>Tóm tắt đơn hàng</h4>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <p className="text-medium font-bold">Địa chỉ nhận hàng</p>
                <Button variant="light" size="sm">Sửa</Button>
              </div>
              <div className="flex flex-col gap-0.5 text-foreground-600">
                <p className="font-bold uppercase text-medium">{address[0].name}</p>
                <p className="text-tiny">{address[0].phone_number}</p>
                <div>
                  <p className="text-tiny">{address[0].street + ", " + address[0].ward + ", " + address[0].district}</p>
                  <p className="text-tiny">{address[0].city}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-medium mb-2 font-bold">Phương thức thanh toán</p>
              <div className="flex gap-2 items-center">
                <Select
                  classNames={{ listboxWrapper: "bg-white", trigger: "bg-white" }}
                  placeholder="Chọn phương thức thanh toán"
                  className="w-full"
                  selectedKeys={selectedPaymentMethod}
                  onSelectionChange={(keys) => {
                    if (typeof keys === "string") {
                      setSelectedPaymentMethod(new Set([keys]));
                    } else if (keys instanceof Set) {
                      setSelectedPaymentMethod(new Set(Array.from(keys)));
                    }
                  }}
                >
                  {paymentMethods.map((payment) => (
                    <SelectItem key={payment.key}>{payment.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-medium mb-2 font-bold">Nhập mã giảm giá</p>
              <div className="flex gap-2 items-center">
                <Input classNames={{ inputWrapper: "bg-white" }} placeholder="Nhập mã giảm giá" className="w-full" />
                <Button color="secondary">Áp dụng</Button>
              </div>
            </div>

            <SummaryTable cartItem={cartItems} />

            {selectedPaymentMethod.size !== 0 && (
              selectedPaymentMethod.has("cod") ? (
                <Button
                  isLoading={isLoading}
                  onPress={handleClick}
                  className="w-full"
                  isDisabled={selectedPaymentMethod.size === 0}
                  color="warning"
                  size="lg"
                >
                  {isLoading ? "Đang xử lý..." : "Xác nhận đơn hàng"}
                </Button>
              ) : (
                <Link href={`/cart/${cartId}/payment-with-qr`}>
                  <Button className="w-full" color="warning" size="lg" disabled={selectedPaymentMethod.size === 0}>
                    Thanh toán
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}