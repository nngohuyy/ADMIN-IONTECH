import React from "react";

type OrderStatus = "Đang xử lý" | "Đang vận chuyển" | "Đã giao" | "Đã hủy";

interface OrderStatusChipProps {
  status: OrderStatus;
}

const statusStyles = {
  "Đang xử lý": {
    bgColor: "#FFE5B5",
    circleColor: "#FC7D22",
  },
  "Đang vận chuyển": {
    bgColor: "#BFD7FF",
    circleColor: "#0866FF",
  },
  "Đã giao": {
    bgColor: "#A6FFBE",
    circleColor: "#34A853",
  },
  "Đã hủy": {
    bgColor: "#FEC0BB",
    circleColor: "#EA4335",
  },
};

const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ status }) => {
  const { bgColor, circleColor } = statusStyles[status];

  return (
    <div
      className="flex justify-center items-center w-fit px-3 h-8 gap-1.5 rounded-full"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 8 8"
        fill="none"
      >
        <circle cx="4" cy="4" r="4" fill={circleColor} />
      </svg>
      <p className="text-smid">{status}</p>
    </div>
  );
};

export default OrderStatusChip;
