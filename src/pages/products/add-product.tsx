import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FileArrowUp, FloppyDisk, Plus } from "@phosphor-icons/react";
import { RadioGroup, Radio } from "@heroui/radio";
import { Slider } from "@heroui/slider";

import { addProductCard } from "@/components/primitives";
import { Editor } from "@/components/editor/editor";
import { ProductCard } from "@/components/product-card/product-card";
import { CustomSelect } from "@/components/select/select";
import { CustomInput } from "@/components/input/input";
import {
  product_status,
  product_template,
  product_type,
  tax_class,
} from "@/constants";
import { ProductVariantsAdder } from "@/components/product-variants/product-variants";

export default function AddProductPage() {
  const [selectedDiscountOption, setSelectedDiscountOption] =
    useState("no-discount");
  const [variants, setVariants] = useState([
    { id: Date.now(), type: "", name: "" },
  ]);

  const handleAddVariant = () => {
    setVariants([...variants, { id: Date.now(), type: "", name: "" }]);
  };

  const handleRemoveVariant = (id: number) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const handleUpdateVariant = (id: number, key: string, value: string) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [key]: value } : variant,
      ),
    );
  };

  return (
    <>
      <Helmet>
        <title>Add New Product | IonTech</title>
        <meta
          content="Add a new product to your IonTech e-commerce store."
          name="description"
        />
      </Helmet>
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
              <CustomSelect
                description="Set the product status"
                label="Product status"
                options={product_status}
                placeholder="Select product status"
              />
            </ProductCard>

            <ProductCard title="Product details">
              <CustomSelect
                description="Set the product type"
                label="Product type"
                options={product_type}
                placeholder="Select product type"
              />
              <Button startContent={<Plus size={18} weight="bold" />}>
                Create new catergory
              </Button>
              <CustomInput
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
              <CustomSelect
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
                    <CustomInput
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
                    <CustomInput
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
                      <CustomInput
                        description="Set the discounted product price. The product will be reduced at the determined fixed price."
                        label="Fixed discounted price"
                        placeholder="Enter discounted price"
                      />
                    </div>
                    <div className="flex flex-row gap-4 justify-between w-full">
                      <CustomSelect
                        description="Set the product tax class."
                        label="Tax class"
                        options={tax_class}
                        placeholder="Select a tax class"
                      />
                      <CustomInput
                        description="Select the product VAT amount."
                        label="VAT amount (%)"
                        placeholder="Enter VAT"
                      />
                    </div>
                  </ProductCard>
                </div>
              </Tab>
              <Tab key="advanced" title="Advanced">
                <div className="flex flex-col gap-8">
                  <ProductCard title="Inventory">
                    <CustomInput
                      description="Set the product SKU."
                      label="SKU"
                      placeholder="Enter product SKU"
                    />
                    <CustomInput
                      description="Set the product barcode."
                      label="Barcode"
                      placeholder="Enter product barcode"
                    />
                    <CustomInput
                      description="Set the product quantity."
                      label="Quantity"
                      placeholder="Enter product quantity"
                    />
                  </ProductCard>

                  <ProductCard title="Variations">
                    <div>
                      <p className="text-[0.875rem] font-bold mb-2">
                        Add product variations
                      </p>
                      <ProductVariantsAdder
                        variants={variants}
                        onAddVariant={handleAddVariant}
                        onRemoveVariant={handleRemoveVariant}
                        onUpdateVariant={handleUpdateVariant}
                      />
                    </div>
                  </ProductCard>
                </div>
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
    </>
  );
}
