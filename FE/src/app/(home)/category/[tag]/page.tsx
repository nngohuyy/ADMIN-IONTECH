'use client'

import { useState } from "react";
import { use } from 'react';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Button, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { Funnel, FunnelX } from "@phosphor-icons/react";
import ProductCard from "@/components/product-card/ProductCard";

import { sample_products } from "@/database/products";
import { laptopCriteria, phoneCriteria, tabletCriteria } from "@/constants/criteria";
import { capitalizeFirstLetter } from "@/utils/utils";
// import Link from "next/link";
import NoResultsFound from "@/components/no-results-found/NoResultsFound";

const criteria = [
  'Phổ biến',
  'Mới nhất',
  'Bán chạy',
  'Giá tăng dần',
  'Giá giảm dần',
  'Giảm giá nhiều nhất',
]

export default function LaptopPage({ params } : { params: Promise<{ tag: string }> }) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const { tag } = use(params);

  const matchesPriceRange = (price: number, range: string) => {
    switch (range) {
      case 'Dưới 5 triệu':
        return price < 5000000;
      case 'Từ 5 - 10 triệu':
        return price >= 5000000 && price < 10000000;
      case 'Từ 10 - 15 triệu':
        return price >= 10000000 && price < 15000000;
      case 'Từ 15 - 20 triệu':
        return price >= 15000000 && price < 20000000;
      case 'Trên 20 triệu':
        return price >= 20000000;
      default:
        return false;
    }
  };

  const filteredProducts =
  selectedKeys.size === 0
    ? sample_products
    : sample_products.filter((product) => {
        if (selectedKeys.has(product.brand)) return true;
        if ([...selectedKeys].some((key) => matchesPriceRange(product.finalPrice, key))) return true;
        if (selectedKeys.has(product.specifications.general.ram)) return true;
        if (selectedKeys.has(product.specifications.general.storage)) return true;
        if (selectedKeys.has(product.specifications.display.screenSize)) return true;
        if (selectedKeys.has(product.specifications.general.battery)) return true;
        if (selectedKeys.has(product.specifications.connectivity.g5)) return true;
        return false;
      });

  return (
    <div className="flex flex-col gap-8">

      <Breadcrumbs>
        <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem color="warning">{capitalizeFirstLetter(tag)}</BreadcrumbItem>
      </Breadcrumbs>

      <section id="flash_sale" className="px-8 py-8 flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center text-white">
          <h3 className="uppercase">Sản phẩm nổi bật</h3>
        </div>
        <div className="grid grid-cols-5 gap-4 w-full">
          {
            sample_products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        <Button variant="solid" color="default">Xem thêm</Button>
      </section>

      <section className="grid grid-cols-[1.5fr_8fr] gap-4 items-start">
        <div className="flex flex-col gap-2 px-4 py-3 bg-[#f2f1ec] rounded-md">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-1.5 items-center w-fit">
              <Funnel size={20} weight="duotone" />
              <p className="font-bold">Bộ lọc</p>
            </div>
            <Button variant="light" color="default" isIconOnly className="w-8 h-8 min-w-8"
              onPress={() => setSelectedKeys(new Set([]))}
            >
              <FunnelX size={20} />
            </Button>
          </div>
          <Listbox
            aria-label="Multiple selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
            classNames={{
              base: 'p-0'
            }}
          >
            {
              tag === 'laptop' ? (
                laptopCriteria.map((section) => (
                  <ListboxSection key={section.key} title={section.key}>
                    {
                      section.value.map((item) => (
                        <ListboxItem key={item}>{item}</ListboxItem>
                      ))
                    }
                  </ListboxSection>
                ))
              ) : tag === 'smartphone' ? (
                phoneCriteria.map((section) => (
                  <ListboxSection key={section.key} title={section.key}>
                    {
                      section.value.map((item) => (
                        <ListboxItem key={item}>{item}</ListboxItem>
                      ))
                    }
                  </ListboxSection>
                ))
              ) : (
                tabletCriteria.map((section) => (
                  <ListboxSection key={section.key} title={section.key}>
                    {
                      section.value.map((item) => (
                        <ListboxItem key={item}>{item}</ListboxItem>
                      ))
                    }
                  </ListboxSection>
                ))
              )
            }
          </Listbox>
        </div>

        <div className="flex flex-grow flex-col gap-4 mt-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-1.5 items-center w-fit">
              <Funnel size={20} weight="duotone" />
              <p className="font-bold">Sắp xếp theo</p>
            </div>
            <div className="flex flex-row gap-1.5">
              {
                criteria.map((criterion) => (
                  <Button
                    key={criterion}
                    variant="bordered"
                    color="default"
                  >
                    {criterion}
                  </Button>
                ))
              }
            </div>
          </div>
          {
            filteredProducts.length === 0 && (
              <div className="flex flex-col gap-6 justify-center items-center">
                <NoResultsFound />
                <Button startContent={<FunnelX size={18} />} variant="solid" color="default" onPress={() => setSelectedKeys(new Set([]))}>Xóa bộ lọc</Button>
              </div>
            )
          }
          <div className="grid grid-cols-5 gap-4">
            {
              filteredProducts.map((product) => (
                // <Link key={product.id} href={`/products/${tag}/${product.id}`}>
                    <ProductCard key={product.id} product={product} />
                // </Link>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}