import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "IonTech | Máy tính cao cấp và thiết bị công nghệ hàng đầu Việt Nam",
  description: "IonTech cung cấp các sản phẩm công nghệ cao cấp như laptop, máy tính bảng, điện thoại, phụ kiện chính hãng với giá tốt nhất thị trường.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <main className="max-w-screen-xl min-h-screen mx-auto px-4 pt-6 pb-16">
        {children}
      </main>
      <Footer />
    </main>
  );
}
