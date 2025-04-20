import OrderTabs from "@/components/order-tabs/OrderTabs";

const orders = [
  {
    orderID: "123456",
    status: "Đang xử lý" as const,
    date: "Ngày 24 tháng 12 năm 2024",
    productImage:
      "https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg",
    productName: "Laptop Dell Inspiron 5640 G14 N6I7512W1 - IceBlue",
    productPrice: "31.990.000 ₫",
    extraProductCount: 1,
  },
  {
    orderID: "789012",
    status: "Đã giao" as const,
    date: "Ngày 15 tháng 11 năm 2024",
    productImage:
      "https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg",
    productName: "MacBook Pro 14 inch M1 - Space Gray",
    productPrice: "52.990.000 ₫",
    extraProductCount: 0,
  },
  {
    orderID: "345678",
    status: "Đang vận chuyển" as const,
    date: "Ngày 10 tháng 11 năm 2024",
    productImage:
      "https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg",
    productName: "iPad Pro 11 inch M2 - Silver",
    productPrice: "28.990.000 ₫",
    extraProductCount: 2,
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-5">
      <h4>Đơn hàng của tôi</h4>
      <div className="px-6">
        <OrderTabs data={orders} />
      </div>
    </div>
  )
}