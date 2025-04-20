"use client";

import { useState } from "react";
import Head from "next/head";

import ProductCard from "@/components/product-card/ProductCard";
import ProductSidebar from "@/components/product-sidebar/ProductSideBar";
import Countdown from "@/components/countdown/Countdown";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
} from "@nextui-org/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SiApple } from "react-icons/si";
import { SiSamsung } from "react-icons/si";
import { SiSony } from "react-icons/si";
import { SiNokia } from "react-icons/si";
import { SiXiaomi } from "react-icons/si";

import AppleTab from "@/components/home-tab/apple-tab";
import SamsungTab from "@/components/home-tab/samsung-tab";
import SonyTab from "@/components/home-tab/sony-tab";
import NokiaTab from "@/components/home-tab/nokia-tab";

import { sample_products } from "@/database/products";
import { ArrowCounterClockwise, ArrowUpRight } from "@phosphor-icons/react";
import XiaomiTab from "@/components/home-tab/xiaomi-tab";

const policyItems = [
  {
    id: 1,
    title: "Đổi trả miễn phí",
    description: "Trong vòng 30 ngày",
    icon: <ArrowCounterClockwise size={48} weight="bold" />,
  },
  {
    id: 2,
    title: "Đổi trả miễn phí",
    description: "Trong vòng 30 ngày",
    icon: <ArrowCounterClockwise size={48} weight="bold" />,
  },
  {
    id: 3,
    title: "Đổi trả miễn phí",
    description: "Trong vòng 30 ngày",
    icon: <ArrowCounterClockwise size={48} weight="bold" />,
  },
  {
    id: 4,
    title: "Đổi trả miễn phí",
    description: "Trong vòng 30 ngày",
    icon: <ArrowCounterClockwise size={48} weight="bold" />,
  },
];

const first_hero = [
  {
    id: 1,
    id_tag: "home_hero_christmas",
    title: "Sắm laptop đón Giáng sinh",
    description: "ưu đãi đến 9,000,000₫",
    button: "Mua ngay",
  },
  {
    id: 2,
    id_tag: "home_hero_lunar",
    title: "Sắm laptop đón Tết Nguyên Đán",
    description: "ưu đãi đến 9,000,000₫",
    button: "Tìm hiểu thêm",
  },
  {
    id: 3,
    id_tag: "home_hero_valentines",
    title: "Sắm laptop đón Valentine",
    description: "ưu đãi đến 9,000,000₫",
    button: "Mua ngay",
  },
];

export default function Home() {
  const [selected, setSelected] = useState("apple");

  return (
    <>
      <Head>
        <title>
          IonTech | Máy tính cao cấp và thiết bị công nghệ hàng đầu Việt Nam
        </title>
      </Head>
      <div className="flex flex-col gap-12">
        <section>
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Pagination, Autoplay]}
            className="homepageSwiper"
          >
            {first_hero.map((hero) => (
              <SwiperSlide key={hero.id}>
                <Card
                  isFooterBlurred
                  radius="lg"
                  className="border-none h-full flex flex-col justify-between"
                  id={hero.id_tag}
                >
                  <CardBody className="flex-grow"></CardBody>
                  <CardFooter className="text-white flex flex-col items-center pb-8">
                    <h3 className="mb-1 mt-2">{hero.title}</h3>
                    <h5 className="mb-3">{hero.description}</h5>
                    <Button className="bg-white text-black mb-2" size="sm">
                      {hero.button}
                    </Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <div className="flex flex-row gap-6">
          <div className="flex-shrink-0">
            <ProductSidebar />
          </div>
          <div className="flex flex-col gap-12 flex-grow">
            <section>
              <div className="flex flex-row justify-between items-center mb-3">
                <h4>Chính sách ưu đãi</h4>
                <Button
                  variant="light"
                  endContent={<ArrowUpRight size={24} weight="duotone" />}
                >
                  Xem thêm
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {policyItems.map((policyItem) => (
                  <Card
                    shadow="none"
                    radius="sm"
                    className="border"
                    isHoverable
                    key={policyItem.id}
                  >
                    <CardBody className="flex flex-row gap-2 items-center">
                      {policyItem.icon}
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-lg font-semibold">
                          {policyItem.title}
                        </h4>
                        <p className="text-sm">{policyItem.description}</p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex flex-row justify-between items-center mb-3">
                <h4>Thương hiệu nổi bật</h4>
                <Button
                  variant="light"
                  endContent={<ArrowUpRight size={24} weight="duotone" />}
                >
                  Xem tất cả
                </Button>
              </div>

              <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key.toString())}
                variant="solid"
                size="lg"
                radius="full"
                classNames={{
                  base: "w-full flex flex-row gap-2",
                  tabList: "w-full flex flex-row min-gap-2 justify-between",
                  cursor: "w-full bg-[#ffffff] shadow",
                  tab: "max-w-fit px-10 h-12",
                  tabContent: "group-data-[selected=true]:text-[#000000]",
                }}
              >
                <Tab
                  key="apple"
                  title={
                    <span className="flex flex-row gap-1 items-center text-lg">
                      <SiApple size={24} />
                      Apple
                    </span>
                  }
                >
                  <AppleTab />
                </Tab>
                <Tab key="samsung" title={<SiSamsung size={100} />}>
                  <SamsungTab />
                </Tab>
                <Tab key="sony" title={<SiSony size={90} />}>
                  <SonyTab />
                </Tab>
                <Tab key="nokia" title={<SiNokia size={70} />}>
                  <NokiaTab />
                </Tab>
                <Tab
                  key="xiaomi"
                  title={
                    <span className="flex flex-row gap-2 items-center text-lg">
                      <SiXiaomi size={24} />
                      Xiaomi
                    </span>
                  }
                >
                  <XiaomiTab />
                </Tab>
              </Tabs>
            </section>

            <section
              id="flash_sale"
              className="px-6 py-8 flex flex-col gap-5 justify-center items-center"
            >
              <div className="flex flex-col gap-2 justify-center items-center text-white">
                <h3>FLASH SALE</h3>
                <Countdown dueDate="2024-12-31T23:59:59Z" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {sample_products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Button variant="solid" color="default">
                Xem thêm
              </Button>
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-center flex-grow">
                <h4>Khuyến mãi</h4>
                <Button
                  variant="light"
                  endContent={<ArrowUpRight size={24} weight="duotone" />}
                >
                  Xem thêm
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {sample_products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-center">
                <h4>Gợi ý sản phẩm</h4>
                <Button
                  variant="light"
                  endContent={<ArrowUpRight size={24} weight="duotone" />}
                >
                  Xem tất cả
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {sample_products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
