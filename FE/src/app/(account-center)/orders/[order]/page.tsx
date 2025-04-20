'use client'
import { useCallback } from "react";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/table";
import { MapPinLine } from "@phosphor-icons/react"

export const order = {
  id: "vZsRD1jd8V82aIbN",
  status: "completed",
  shipping: {
    carrier: "SPX Express",
    tracking: "SPXVN0123456789"
  },
  shippingAddress: {
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"
  },
  shippingFee: 20000,
  items: [
    {
      id: "fJap8PyP",
      image: "https://via.placeholder.com/150",
      color: "black",
      name: "Áo thun nam",
      price: 100000,
      quantity: 2
    },
    {
      id: "Md6Gjh3G",
      image: "https://via.placeholder.com/150",
      color: "red",
      name: "Quần jean nam",
      price: 200000,
      quantity: 4
    },
    {
      id: "vZsRD1jd",
      image: "https://via.placeholder.com/150",
      color: "blue",
      name: "Giày thể thao nam",
      price: 300000,
      quantity: 1
    },
    {
      id: "d8V82aIb",
      image: "https://via.placeholder.com/150",
      color: "gray",
      name: "Giày thể thao nam",
      price: 300000,
      quantity: 1
    }
  ]
}

export const columns = [
  { name: "TÊN SẢN PHẨM", uid: "name" },
  // { name: "PRODUCT CODE", uid: "id" },
  { name: "SỐ LƯỢNG", uid: "quantity" },
  { name: "ĐƠN GIÁ", uid: "price" },
  { name: "TỔNG", uid: "total" },
  { name: "", uid: "actions" },
];

export default function OrderDetailsPage() {
  interface OrderItem {
    id: string;
    image: string;
    color: string;
    name: string;
    price: number;
    quantity: number;
  }

  interface Column {
    name: string;
    uid: string;
  }

  const subTotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subTotal * 0.1;
  const total = subTotal + tax + order.shippingFee;

  const renderCell = useCallback(
    (item: OrderItem, column: Column) => {
      const cellValue = item[column.uid as keyof OrderItem];
      switch (column.uid) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: item.image }}
              description={`Màu sắc: ${item.color.toUpperCase()}`}
              name={cellValue}
            />
          );
        case "price":
          return <>{item.price.toLocaleString()}đ</>;
        case "total":
          return <>{(item.price * item.quantity).toLocaleString()}đ</>;
        case "actions":
          return <Button variant="light" size="sm" className="text-blue-600">Xem chi tiết</Button>;
        default:
          return cellValue;
      }
    }, []);

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-6">
      <div className="flex flex-col items-end gap-6">
        <Table isStriped classNames={{ td: "text-sm" }}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={order.items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => {
                  const column = columns.find((col) => col.uid === columnKey) as Column;
                  return <TableCell>{renderCell(item, column)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-row justify-between w-3/4">
          <h6 className="font-semibold px-4 py-2">Tóm tắt đơn hàng</h6>
          <div className="flex flex-col gap-2 w-1/2 border-b-2 px-4 py-2 border-gray-200">
            <div className="flex justify-between">
              <p>Tạm tính</p>
              <p className="font-bold">{subTotal.toLocaleString()}đ</p>
            </div>
            <div className="flex justify-between">
              <p>Phí vận chuyển</p>
              <p className="font-bold">{order.shippingFee.toLocaleString()}đ</p>
            </div>
            <div className="flex justify-between">
              <p>Thuế VAT</p>
              <p className="font-bold">{tax.toLocaleString()}đ</p>
            </div>
            <div className="flex justify-between">
              <p>Tổng cộng</p>
              <p className="font-bold">{total.toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-green-300 px-4 py-2 rounded-md">
          <p className="text-lg font-semibold ">
            {order.status === "completed" ? "Đơn hàng đã được giao" : "Đơn hàng đang được vận chuyển"}
          </p>
          <p>Mã đơn hàng: {order.id}</p>
        </div>
        <div className="flex flex-col px-4 py-2 bg-gray-50 rounded-md">
          <p className="font-bold">Thông tin vận chuyển</p>
          <p><span>{order.shipping.carrier}</span>: <span>{order.shipping.tracking}</span></p>
        </div>
        <div className="flex flex-col px-4 py-2 bg-gray-50 border-t-1 border-gray-200 rounded-md gap-1.5">
          <p className="font-bold">Địa chỉ nhận hàng</p>
          <div className="flex flex-row gap-2">
            <MapPinLine size={24} weight="duotone" />
            <div className="flex flex-col">
              <p>
                <span>{order.shippingAddress.name}</span> <span className="text-gray-400 text-[0.875rem]">{order.shippingAddress.phone}</span>
              </p>
              <p>{order.shippingAddress.address}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}