import React from "react";
import OrderStatusChip from "../order-status-chip/OrderStatusChip";
import Image from "next/image";
import Link from "next/link";

interface OrderListingItemProps {
  orderID: string;
  status: "Đang xử lý" | "Đang vận chuyển" | "Đã giao" | "Đã hủy";
  date: string;
  productImage: string;
  productName: string;
  productPrice: string;
  extraProductCount: number;
}

const OrderListingItem: React.FC<OrderListingItemProps> = ({
  orderID,
  status,
  date,
  productImage,
  productName,
  productPrice,
  extraProductCount,
}) => {
  return (
    <Link href={`/orders/${orderID}`}>
      <div className="flex justify-between items-center px-6 py-4 rounded-2xl border-2 border-solid border-[#E8ECF4] transition duration-120 hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow-lg active:scale-[98%] active:bg-[#F1F5F9] active:shadow-none">
        <div className="flex flex-col gap-1">
          {/* Status and Date */}
          <div className="flex items-center gap-3">
            <OrderStatusChip status={status} />
            <p>{date}</p>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <Image
                alt="product-image"
                src={productImage}
                width={160}
                height={160}
              />
              <div className="flex flex-col gap-2 mt-3">
                <p>
                  Mã đơn hàng: <span>{orderID}</span>
                </p>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-xl">{productName}</p>
                  <p className="text-xl">{productPrice}</p>
                </div>
              </div>
            </div>
            {extraProductCount > 0 && (
              <p>
                ...và <span>{extraProductCount}</span> sản phẩm nữa
              </p>
            )}
          </div>
        </div>

        {/* Chevron Icon */}
        <i className="text-3xl pi pi-chevron-right"></i>
      </div>
    </Link>
  );
};

export default OrderListingItem;
