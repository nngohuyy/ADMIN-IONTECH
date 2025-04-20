'use client'

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const ratingTemplate = [
  "Giao hàng nhanh",
  "Nhân viên thân thiện",
  "Sản phẩm chất lượng",
  "Đóng gói cẩn thận",
  "Giá cả hợp lý",
]

export default function ReviewsPage() {
  const [isSelected, setIsSelected] = useState(Array(ratingTemplate.length).fill(false));

  const toggleSelected = (index: number) => {
    setIsSelected((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    })
  }

  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-row gap-2 items-center">
        <Button variant="bordered" radius="full">Chờ đánh giá <span className="font-bold">13</span></Button>
        <Button variant="bordered" radius="full">Đã đánh giá <span className="font-bold">14</span></Button>
      </div>

      {/* RatingListingItem */}
      <div className="flex flex-row gap-3 px-6 py-4 rounded-2xl border-2 border-solid focus-within:bg-[#F9FAFB] border-[#E8ECF4] transition duration-120">
        <Image
          alt="ble"
          src="https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg"
          width={160}
          height={160}
          className="object-contain object-top"
        />
        <div className="flex flex-col gap-2 mt-2 flex-grow">
          <p className="font-bold text-xl">Laptop Lenovo V14 G4 IRU 83A000BHVN</p>
          <div className="flex flex-row gap-1">
            <FaStar size={24} />
            <FaStar size={24} />
            <FaStar size={24} />
            <FaStar size={24} />
            <FaStar size={24} />
          </div>
          <div className="flex flex-row gap-1.5">
            {
              ratingTemplate.map((item, index) => (
                <Button
                  key={index}
                  radius="full"
                  size="sm"
                  startContent={isSelected[index] ? <i className="pi pi-check"></i> : null}
                  color={isSelected[index] ? `success` : `default`}
                  variant={isSelected[index] ? `solid` : `bordered`}
                  onPress={() => toggleSelected(index)}
                >
                  {item}
                </Button>
              ))
            }
          </div>
          <Textarea
            type="text"
            fullWidth
            minRows={2}
            className="h-max-32"
            variant="underlined"
            placeholder="Nhập đánh giá của bạn"
            classNames={{ input: "peer px-0" }}
            endContent={
              <Button
                isIconOnly
                variant="light"
                startContent={<i className="pi pi-send"></i>}
              ></Button>
            }
          />
        </div>
      </div>

    </div>
  )
}