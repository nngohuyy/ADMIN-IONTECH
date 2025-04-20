'use client'
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="header" className="w-full">
      <div className="flex h-1 bg-[#FC7D22]"></div>
      <div className="max-w-screen-xl mx-auto px-4 py-16 flex flex-row justify-between">
        
        <ul className="space-y-5">
        <li className="font-bold">Dịch vụ trang web</li>
          <li>Giới thiệu</li>
          <li>Dịch vụ</li>
          <li>Liên hệ</li>
          <li>Câu hỏi thường gặp</li>
        </ul>
        <ul className="space-y-5">
          <li className="font-bold">Hỗ trợ</li>
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật</li>
          <li>Chính sách đổi trả</li>
          <li>Chính sách vận chuyển</li>
        </ul>
        <div className="space-y-14">
          <ul className="space-y-5">
            <li className="font-bold">Phương thức thanh toán</li>
            <ul className="grid grid-cols-3 gap-x-8 gap-y-5">
              <li className="relative h-10 w-20">
                <Image
                  src="/payment_methods/napas.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative">
                <Image
                  src="/payment_methods/visa.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative">
                <Image
                  src="/payment_methods/mastercard.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative h-10">
                <Image
                  src="/payment_methods/jcb.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative max-h-10">
                <Image
                  src="/payment_methods/momo.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative h-10">
                <Image
                  src="/payment_methods/zalopay.png"
                  alt="Next.js logo"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </li>
            </ul>
          </ul>
          <ul className="space-y-5">
            <li className="font-bold">Đối tác vận chuyển</li>
            <ul className="grid grid-cols-3 gap-5">
              <li className="relative h-10">
                <Image
                  src="/delivery/ghtk.png"
                  alt="Next.js logo"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </li>
              <li className="relative h-10">
                <Image
                  src="/delivery/spx.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative h-10">
                <Image
                  src="/delivery/viettel_post.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
              <li className="relative h-10">
                <Image
                  src="/delivery/ninjavan.svg"
                  alt="Next.js logo"
                  fill
                />
              </li>
            </ul>
          </ul>
        </div>
        <ul className="space-y-5">
          <li className="font-bold">Theo dõi IonTech</li>
          <li className="flex items-center gap-2"><span className="pi pi-facebook text-[1.25rem]"></span>Facebook</li>
          <li className="flex items-center gap-2"><span className="pi pi-youtube text-[1.25rem]"></span>YouTube</li>
          <li className="flex items-center gap-2"><span className="pi pi-instagram text-[1.25rem]"></span>Instagram</li>
          <li className="flex items-center gap-2"><span className="pi pi-linkedin text-[1.25rem]"></span>LinkedIn</li>
        </ul>
      </div>
    </footer>
  )
}