'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { formatCurrencyVND, calculateDiscountedPrice } from "@/utils/utils";
import { Chip } from "@nextui-org/react";
import { slugifyString } from "@/utils/utils";

type ProductCardProps = {
  product: Product;
};

type Product = {
  name: string;
  netPrice: number;
  image: string;
  discount: number;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${slugifyString(product.name)}`} className="w-full h-full">
      <Card
        classNames={{
          base: 'bg-[#f8f7f1] hover:bg-[#f5f1da] transition duration-150 ease-in-out hover:drop-shadow-lg'
        }}
        radius="sm"
        shadow="none"
        fullWidth
        isPressable
        disableRipple
        disableAnimation
      >
        <CardHeader>
          <Image
            alt="Card background"
            className="object-contain rounded-xl mx-auto h-40"
            src={product.image}
            width={180}
            height={180}
          />
        </CardHeader>
        <CardBody>
          <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">{product.name}</p>
          <p className="body3 text-default-500 line-through mt-2">{formatCurrencyVND(product.netPrice)}</p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[#FC7D22] font-bold">{formatCurrencyVND(calculateDiscountedPrice(product.netPrice, product.discount))}</p>
            <Chip size="sm" color="warning" classNames={
              {
                base: "px-0.5 h-4",
                content: "text-[0.625rem]",
              }
            }>{"-" + product.discount + "%"}</Chip>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;