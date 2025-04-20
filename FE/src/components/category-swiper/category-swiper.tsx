'use client';

import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export const CategorySwiper = ({
  slidesPerView,
  spaceBetween,
  items,
}: {
  slidesPerView: number;
  spaceBetween: number;
  items: {
    label: string;
    icon: React.ReactNode;
    url: string;
  }[];
}) => {
  return (
    <div className="swiper-container">
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: "#nextBtn",
          prevEl: "#prevBtn",
        }}
        className="mySwiper"
      >
        {items.map((item) => (
          <Link key={item.label} href={item.url}>
            <SwiperSlide>
              <Card
                className="p-3 w-full h-full border"
                isHoverable
                isPressable
                shadow="none"
              >
                <CardBody
                  className="flex justify-center items-center text-center gap-3"
                >
                  {item.icon}
                  <p className="leading-snug">{item.label}</p>
                </CardBody>
              </Card>
            </SwiperSlide>
          </Link>
        ))}
      </Swiper>
    </div>
  );
};
