'use client'

import React, { useState } from "react";
import OrderListingItem from "../order-listing-item/OrderListingItem";
import { Button } from "@nextui-org/button";

const statuses = [
  "Tất cả",
  "Đang xử lý",
  "Đang vận chuyển",
  "Đã giao",
  "Đã hủy",
] as const;

type StatusFilter = typeof statuses[number];

interface Order {
  orderID: string;
  status: StatusFilter;
  date: string;
  productImage: string;
  productName: string;
  productPrice: string;
  extraProductCount: number;
}

interface OrderTabsProps {
  data: Order[];
}

const OrderTabs: React.FC<OrderTabsProps> = ({ data }) => {
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("Tất cả");

  // Filter orders based on the active status
  const filteredOrders =
    activeStatus === "Tất cả"
      ? data
      : data.filter((order) => order.status === activeStatus);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-row gap-2">
        {statuses.map((status) => (
          <Button
            key={status}
            radius="full"
            variant={activeStatus === status ? "solid" : "bordered"}
            onClick={() => setActiveStatus(status)}
            className={`${
              activeStatus === status
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Order List */}
      <div className="flex flex-col gap-6">
        {filteredOrders.map((order) => (
          <OrderListingItem
            key={order.orderID}
            orderID={order.orderID}
            status={order.status as "Đang xử lý" | "Đang vận chuyển" | "Đã giao" | "Đã hủy"}
            date={order.date}
            productImage={order.productImage}
            productName={order.productName}
            productPrice={order.productPrice}
            extraProductCount={order.extraProductCount}
          />
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-center">Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTabs;
