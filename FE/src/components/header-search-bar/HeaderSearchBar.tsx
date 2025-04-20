'use client'

import { useState } from "react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { sample_products } from "@/database/products";
import { Card } from "@nextui-org/card";
import { formatCurrencyVND, slugifyString } from "@/utils/utils";

interface HeaderSearchBarProps {
  placeholder?: string;
}

export default function HeaderSearchBar({ placeholder = "Tìm kiếm sản phẩm" }: HeaderSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<typeof sample_products>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const matches = sample_products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(matches);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        classNames={{
          inputWrapper: "bg-[var(--card)]",
        }}
        startContent={<MagnifyingGlass size={20} />}
      />
      {searchTerm && isFocused && (
        <div className="absolute w-full bg-white border border-gray-200 rounded shadow-lg mt-2 p-2 max-h-[30rem] overflow-y-auto z-10">
          <div className="flex flex-col gap-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${slugifyString(product.name)}`}>
                  <Card key={product.id} isHoverable isPressable shadow="none" radius="sm" fullWidth className="cursor-pointer" onPress={handleProductClick}>
                    <div className="flex flex-row gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="w-16 h-16 p-1 object-cover rounded border" />
                      <div className="flex flex-col justify-center items-start">
                        <p className="text-smid font-bold">{product.name}</p>
                        <div className="flex flex-row gap-3">
                          <p className="text-smid text-orange-500">{formatCurrencyVND(product.finalPrice)}</p>
                          <p className="text-smid text-gray-500 line-through font-light">{formatCurrencyVND(product.netPrice)}</p>
                          <p className="text-smid text-orange-500 font-light">{product.discount + '%'}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <p className="p-2 text-gray-500 text-center">Không tìm thấy kết quả</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}