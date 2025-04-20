import "primeicons/primeicons.css";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";

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
  Usb,
  Gift,
  CaretRight,
} from "@phosphor-icons/react";

const iconSize = 24;

const SideBarItems = [
  {
    "icon": <Laptop size={iconSize} weight="duotone"/>,
    "label": "Laptop",
    "url": "/category/laptop"
  },
  {
    "icon": <DesktopTower size={iconSize} weight="duotone"/>,
    "label": "PC",
    "url": "/category/pc-gvn"
  },
  {
    "icon": <Cpu size={iconSize} weight="duotone"/>,
    "label": "Main, CPU, VGA",
    "url": "/category/main-cpu-vga"
  },
  {
    "icon": <SuitcaseRolling size={iconSize} weight="duotone"/>,
    "label": "Case, Nguồn, Tản",
    "url": "/category/case-nguon-tan"
  },
  {
    "icon": <Memory size={iconSize} weight="duotone"/>,
    "label": "Ổ cứng, RAM, Thẻ nhớ",
    "url": "/category/o-cung-ram-the-nho"
  },
  {
    "icon": <SpeakerHifi size={iconSize} weight="duotone"/>,
    "label": "Loa, Micro, Webcam",
    "url": "/category/loa-micro-webcam"
  },
  {
    "icon": <Monitor size={iconSize} weight="duotone"/>,
    "label": "Màn hình",
    "url": "/category/man-hinh"
  },
  {
    "icon": <Keyboard size={iconSize} weight="duotone"/>,
    "label": "Bàn phím",
    "url": "/category/ban-phim"
  },
  {
    "icon": <Mouse size={iconSize} weight="duotone"/>,
    "label": "Chuột + Lót chuột",
    "url": "/category/chuot-lot-chuot"
  },
  {
    "icon": <Headphones size={iconSize} weight="duotone"/>,
    "label": "Tai Nghe",
    "url": "/category/tai-nghe"
  },
  {
    "icon": <OfficeChair size={iconSize} weight="duotone"/>,
    "label": "Ghế - Bàn",
    "url": "/category/ghe-ban"
  },
  {
    "icon": <MicrosoftWordLogo size={iconSize} weight="duotone"/>,
    "label": "Phần mềm, mạng",
    "url": "/category/phan-mem-mang"
  },
  {
    "icon": <GameController size={iconSize} weight="duotone"/>,
    "label": "Handheld, Console",
    "url": "/category/handheld-console"
  },
  {
    "icon": <Usb size={iconSize} weight="duotone"/>,
    "label": "Phụ kiện (Hub, sạc, cáp..)",
    "url": "/category/phu-kien"
  },
  {
    "icon": <Gift size={iconSize} weight="duotone"/>,
    "label": "Dịch vụ và thông tin khác",
    "url": "/category/dich-vu"
  }
]

export default function ProductSidebar() {
  return (
    <nav className="sticky top-6 rounded-lg">
      <div className="flex flex-col">
        <p className="ml-4 py-2 font-bold text-smid">Danh mục</p>
        {
          SideBarItems.map((item, index) => (
            <Tooltip
              key={index}
              placement="right-start"
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Custom Content</div>
                  <div className="text-tiny">This is a custom tooltip content</div>
                </div>
              }
            >
              <Link href={item.url}>
                <Button
                  className="flex flex-row w-full hover:!bg-[#FFE5B5] justify-start items-center gap-2"
                  variant="light"
                  size="md"
                  radius="sm"
                  startContent={item.icon}
                  endContent={<CaretRight size={18} className="ml-auto" />}
                >
                  {item.label}
                </Button>
              </Link>
            </Tooltip>
          ))
        }
      </div>
    </nav >
  )
}