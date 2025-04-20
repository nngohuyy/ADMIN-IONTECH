import type { Metadata } from "next";

import { Button } from "@nextui-org/button";
import { CategorySwiper } from "@/components/category-swiper/category-swiper";

import {
  Laptop,
  DesktopTower,
  Cpu,
  SuitcaseRolling,
  Memory,
  SpeakerHifi,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  OfficeChair,
  MicrosoftWordLogo,
  GameController,
  SlidersHorizontal,
  Gift,
  CaretRight,
  CaretLeft
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "IonTech | Laptop văn phòng chính hãng giá tốt",
  description: "IonTech cung cấp các sản phẩm công nghệ cao cấp như laptop, máy tính bảng, điện thoại, phụ kiện chính hãng với giá tốt nhất thị trường.",
};

const iconSize = 54;

const SideBarItems = [
  {
    "icon": <Laptop size={iconSize} weight="duotone" />,
    "label": "Laptop",
    "url": "/products/laptop"
  },
  {
    "icon": <DesktopTower size={iconSize} weight="duotone" />,
    "label": "PC",
    "url": "/products/pc-gvn"
  },
  {
    "icon": <Cpu size={iconSize} weight="duotone" />,
    "label": "Main, CPU, VGA",
    "url": "/products/main-cpu-vga"
  },
  {
    "icon": <SuitcaseRolling size={iconSize} weight="duotone" />,
    "label": "Case, Nguồn, Tản",
    "url": "/products/case-nguon-tan"
  },
  {
    "icon": <Memory size={iconSize} weight="duotone" />,
    "label": "Ổ cứng, RAM, Thẻ nhớ",
    "url": "/products/o-cung-ram-the-nho"
  },
  {
    "icon": <SpeakerHifi size={iconSize} weight="duotone" />,
    "label": "Loa, Micro, Webcam",
    "url": "/products/loa-micro-webcam"
  },
  {
    "icon": <Monitor size={iconSize} weight="duotone" />,
    "label": "Màn hình",
    "url": "/products/man-hinh"
  },
  {
    "icon": <Keyboard size={iconSize} weight="duotone" />,
    "label": "Bàn phím",
    "url": "/products/ban-phim"
  },
  {
    "icon": <Mouse size={iconSize} weight="duotone" />,
    "label": "Chuột + Lót chuột",
    "url": "/products/chuot-lot-chuot"
  },
  {
    "icon": <Headphones size={iconSize} weight="duotone" />,
    "label": "Tai Nghe",
    "url": "/products/tai-nghe"
  },
  {
    "icon": <OfficeChair size={iconSize} weight="duotone" />,
    "label": "Ghế - Bàn",
    "url": "/products/ghe-ban"
  },
  {
    "icon": <MicrosoftWordLogo size={iconSize} weight="duotone" />,
    "label": "Phần mềm, mạng",
    "url": "/products/phan-mem-mang"
  },
  {
    "icon": <GameController size={iconSize} weight="duotone" />,
    "label": "Handheld, Console",
    "url": "/products/handheld-console"
  },
  {
    "icon": <SlidersHorizontal size={iconSize} weight="duotone" />,
    "label": "Phụ kiện (Hub, sạc, cáp..)",
    "url": "/products/phu-kien"
  },
  {
    "icon": <Gift size={iconSize} weight="duotone" />,
    "label": "Dịch vụ và thông tin khác",
    "url": "/products/dich-vu"
  }
];

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <h4>Danh mục</h4>
          <div className="flex flex-row gap-1.5">
            <Button
              id="prevBtn"
              isIconOnly
              color='default'
              size='sm'
              radius="full"
            >
              <CaretLeft size={20} weight="bold" />
            </Button>
            <Button
              id="nextBtn"
              isIconOnly
              color='default'
              size='sm'
              radius="full"
            >
              <CaretRight size={20} weight="bold" />
            </Button>
          </div>
        </div>
        <CategorySwiper
          slidesPerView={5}
          spaceBetween={10}
          items={SideBarItems}
        />
      </div>
      <main>
        {children}
      </main>
    </div>
  )
}