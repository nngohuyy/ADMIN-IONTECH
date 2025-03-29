import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { FileArrowUp, FloppyDisk, Plus } from "@phosphor-icons/react";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { Slider } from "@heroui/slider";

import { addProductCard } from "@/components/primitives";
import { Editor } from "@/components/editor/editor";

const product_status = [
  { key: "draft", label: "Draft" },
  { key: "published", label: "Published" },
  { key: "archived", label: "Archived" },
  { key: "pending", label: "Pending" },
  { key: "deleted", label: "Deleted" },
];

const product_template = [
  { key: "default", label: "Default" },
  { key: "electronics", label: "Electronics" },
  { key: "clothing", label: "Clothing" },
  { key: "home_appliances", label: "Home Appliances" },
  { key: "books", label: "Books" },
  { key: "toys", label: "Toys" },
];

const product_type = [
  { key: "laptop", label: "Laptop" },
  { key: "pc", label: "PC" },
  { key: "main-cpu-vga", label: "Main, CPU, VGA" },
  { key: "case-nguon-tan", label: "Case, Nguồn, Tản" },
  { key: "o-cung-ram-the-nho", label: "Ổ cứng, RAM, Thẻ nhớ" },
  { key: "loa-micro-webcam", label: "Loa, Micro, Webcam" },
  { key: "man-hinh", label: "Màn hình" },
  { key: "ban-phim", label: "Bàn phím" },
  { key: "chuot-lot-chuot", label: "Chuột + Lót chuột" },
  { key: "tai-nghe", label: "Tai Nghe" },
  { key: "ghe-ban", label: "Ghế - Bàn" },
  { key: "phan-mem-mang", label: "Phần mềm, mạng" },
  { key: "handheld-console", label: "Handheld, Console" },
  { key: "phu-kien", label: "Phụ kiện (Hub, sạc, cáp..)" },
  { key: "dich-vu", label: "Dịch vụ và thông tin khác" },
];

const tax_class = [
  { key: "tax-free", label: "Tax free" },
  { key: "taxable-goods", label: "Taxable goods" },
  { key: "taxable-services", label: "Taxable services" },
];

function ProductCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={addProductCard({
        rounded: "lg",
        shadow: "none",
      })}
    >
      <CardHeader className="flex px-8">
        <h2 className="text-lg font-bold">{title}</h2>
      </CardHeader>
      <CardBody className="pt-0 px-8 pb-6 flex flex-col gap-4 justify-center items-start">
        {children}
      </CardBody>
    </Card>
  );
}

function SelectComponent({
  label,
  description,
  placeholder,
  options,
}: {
  label: string;
  description: string;
  placeholder: string;
  options: { key: string; label: string }[];
}) {
  return (
    <Select
      classNames={{
        trigger: "bg-white",
        label: "font-bold",
        helperWrapper: "mt-1",
      }}
      defaultSelectedKeys={[""]}
      description={description}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      variant="bordered"
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}

function InputComponent({
  label,
  description,
  placeholder,
}: {
  label: string;
  description: string;
  placeholder: string;
}) {
  return (
    <Input
      classNames={{
        inputWrapper: "bg-white",
        label: "font-bold",
        helperWrapper: "mt-1",
      }}
      description={description}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      variant="bordered"
    />
  );
}

export default function AddProductPage() {
  const [selectedDiscountOption, setSelectedDiscountOption] =
    useState("no-discount");

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form className="grid grid-cols-[1fr_3fr] gap-8">
        <div className="flex flex-col gap-8">
          <Card
            className={addProductCard({
              rounded: "lg",
              shadow: "none",
            })}
          >
            <CardHeader className="flex px-8 pb-0">
              <h2 className="text-lg font-bold">Thumbnail</h2>
            </CardHeader>
            <CardBody className="pt-0 px-8 pb-6 flex flex-col gap-4 justify-center items-center">
              <div className="flex items-center mt-4 justify-center bg-[url('https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png')] bg-cover bg-center h-36 w-36 rounded-lg">
                <div className="h-full w-full box-shadow">
                  <p className="hidden">hehe</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                image files are accepted
              </p>
            </CardBody>
          </Card>

          <ProductCard title="Status">
            <SelectComponent
              description="Set the product status"
              label="Product status"
              options={product_status}
              placeholder="Select product status"
            />
          </ProductCard>

          <ProductCard title="Product details">
            <SelectComponent
              description="Set the product type"
              label="Product type"
              options={product_type}
              placeholder="Select product type"
            />
            <Button startContent={<Plus size={18} weight="bold" />}>
              Create new catergory
            </Button>
            <InputComponent
              description="Add tags to the product."
              label="Tags"
              placeholder="Enter product tag"
            />
          </ProductCard>

          <ProductCard title="Weekly sales">
            <p className="text-tiny text-foreground-400 leading-normal">
              No data available. Sales data will begin capturing once product
              has been published.
            </p>
          </ProductCard>

          <ProductCard title="Product template">
            <SelectComponent
              description="Assign a template from your current theme to define how a single product is displayed."
              label="Select a product template"
              options={product_template}
              placeholder="Select product template"
            />
          </ProductCard>
        </div>
        <div>
          <Tabs
            aria-label="Add product tab"
            defaultSelectedKey="general"
            variant="underlined"
          >
            <Tab key="general" title="General">
              <div className="flex flex-col gap-8">
                <ProductCard title="General">
                  <InputComponent
                    description="A product name is required and recommended to be unique."
                    label="Product name"
                    placeholder="Enter product name"
                  />
                  <div className="w-full">
                    <p className="font-bold text-[0.875rem] mb-2">
                      Description
                    </p>
                    <Editor />
                    <div className="p-1 flex-col gap-1.5 mt-1">
                      <p className="text-tiny text-foreground-400">
                        Set a description to the product for better visibility.
                      </p>
                    </div>
                  </div>
                </ProductCard>

                <ProductCard title="Media">
                  <div className="w-full flex flex-row gap-3 border border-[#4FC9DA] border-dashed rounded-2xl bg-[#DDF8FC] p-6">
                    <FileArrowUp size={40} weight="duotone" />
                    <div className="flex flex-col gap-1.5">
                      <h6>Drop files here or click to upload.</h6>
                      <p className="body2 text-foreground-400">
                        Upload up to 10 files.
                      </p>
                    </div>
                  </div>
                  <div className="p-1 flex-col gap-1.5 mt-1">
                    <p className="text-tiny text-foreground-400">
                      Set the product media gallery.
                    </p>
                  </div>
                </ProductCard>

                <ProductCard title="Pricing">
                  <InputComponent
                    description="Set the product price."
                    label="Base price"
                    placeholder="Enter product base price"
                  />
                  <RadioGroup
                    label="Discount type"
                    value={selectedDiscountOption}
                    onValueChange={setSelectedDiscountOption}
                  >
                    <Radio value="no-discount">No discount</Radio>
                    <Radio value="percentage">Percentage %</Radio>
                    <Radio value="fixed-price">Fixed price</Radio>
                  </RadioGroup>
                  <div
                    className={
                      selectedDiscountOption === "percentage"
                        ? `flex flex-col w-full`
                        : `hidden`
                    }
                  >
                    <Slider
                      color="foreground"
                      defaultValue={0.2}
                      formatOptions={{ style: "percent" }}
                      label="Set discount percentage"
                      marks={[
                        {
                          value: 0.25,
                          label: "25%",
                        },
                        {
                          value: 0.5,
                          label: "50%",
                        },
                        {
                          value: 0.75,
                          label: "75%",
                        },
                      ]}
                      maxValue={1}
                      minValue={0}
                      size="sm"
                      step={0.05}
                    />
                    <div className="p-1 flex-col gap-1.5 mt-1">
                      <p className="text-tiny text-foreground-400">
                        Set a percentage discount to be applied on this product.
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      selectedDiscountOption === "fixed-price"
                        ? `flex w-full`
                        : `hidden`
                    }
                  >
                    <InputComponent
                      description="Set the discounted product price. The product will be reduced at the determined fixed price."
                      label="Fixed discounted price"
                      placeholder="Enter discounted price"
                    />
                  </div>
                  <div className="flex flex-row gap-4 justify-between w-full">
                    <SelectComponent
                      description="Set the product tax class."
                      label="Tax class"
                      options={tax_class}
                      placeholder="Select a tax class"
                    />
                    <InputComponent
                      description="Select the product VAT amount."
                      label="VAT amount (%)"
                      placeholder="Enter VAT"
                    />
                  </div>
                </ProductCard>
              </div>
            </Tab>
            <Tab key="advanced" title="Advanced">
              blah
            </Tab>
          </Tabs>
          <div className="flex flex-row gap-2 justify-end w-full mt-4">
            <Button variant="flat">Cancel</Button>
            <Button
              color="primary"
              startContent={<FloppyDisk size={22} weight="duotone" />}
              type="submit"
            >
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
