import Image from "next/image";
import "primeicons/primeicons.css";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const NavBarItems = [
  {
    icon: "pi pi-user",
    label: "Thông tin tài khoản",
    url: "/profile",
  },
  {
    icon: "pi pi-shopping-bag",
    label: "Quản lý đơn hàng",
    url: "/orders",
  },
  {
    icon: "pi pi-wallet",
    label: "Phương thức thanh toán",
    url: "/payment",
  },
  {
    icon: "pi pi-address-book",
    label: "Sổ địa chỉ",
    url: "/address",
  },
  {
    icon: "pi pi-comments",
    label: "Đánh giá sản phẩm",
    url: "/review",
  },
  {
    icon: "pi pi-heart-fill",
    label: "Sản phẩm yêu thích",
    url: "/wishlist",
  },
]

export default function AccountCenterSidebar() {
  const userName = "NGUYỄN NGÔ HUY";

  return (
    <nav className="flex flex-col gap-6">
      <Link href="/profile">
        <section className="px-5 py-3 flex flex-row items-center gap-3">
          <Image
            src="https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676"
            alt="Logo"
            width={54}
            height={54}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p>Tài khoản của</p>
            <h5>{userName}</h5>
          </div>
        </section>
      </Link>
      <section>
        {
          NavBarItems.map((item, index) => (
            <Link key={index} href={item.url}>
              <Button
                className="flex flex-row w-full hover:!bg-[#FFE5B5] h-12 justify-start items-center gap-4 px-6"
                variant="light"
                size="lg"
                radius="full"
                startContent={<i className={item.icon + " text-[1.125rem]"}></i>}
              >
                {item.label}
              </Button>
            </Link>
          ))
        }
      </section>
    </nav>
  )
}