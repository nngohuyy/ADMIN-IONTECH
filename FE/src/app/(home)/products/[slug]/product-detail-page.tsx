'use client'

import {
  Star,
  LineVertical,
  Circle,
  ShoppingCartSimple,
  CheckFat,
  Plus,
  CaretRight
} from "@phosphor-icons/react/dist/ssr";

import {
  Listbox,
  ListboxItem,
  ListboxSection
} from "@nextui-org/listbox";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/table";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import ProductCard from "@/components/product-card/ProductCard";
import { ProductImageSlider } from "@/components/product-image-slider/ProductImageSlider";

import { sample_products } from "@/database/products";
import { formatCurrencyVND } from "@/utils/utils";

const keyMappings: Record<string, string> = {
  "general.model": "Model",
  "general.os": "Operating System",
  "general.processor": "Processor",
  "general.ram": "RAM",
  "general.storage": "Storage",
  "general.expandableStorage": "Expandable Storage",
  "general.graphics": "Graphics Card",
  "general.battery": "Battery",
  "general.charging": "Charging",
  "display.screenSize": "Screen Size",
  "display.resolution": "Resolution",
  "display.panelType": "Panel Type",
  "display.refreshRate": "Refresh Rate",
  "display.touchscreen": "Touchscreen",
  "display.brightness": "Brightness",
  "connectivity.wifi": "Wi-Fi",
  "connectivity.bluetooth": "Bluetooth",
  "connectivity.ports": "Ports",
  "connectivity.simSupport": "SIM Support",
  "connectivity.g5": "5G Support",
  "camera.rearCamera": "Rear Camera",
  "camera.frontCamera": "Front Camera",
  "camera.videoRecording": "Video Recording",
  "audio.speakers": "Speakers",
  "audio.microphones": "Microphones",
  "audio.audioJack": "Audio Jack",
  "buildAndDesign.material": "Material",
  "buildAndDesign.weight": "Weight",
  "buildAndDesign.dimensions": "Dimensions",
  "others.security": "Security",
  "others.keyboard": "Keyboard",
  "others.penSupport": "Pen Support",
  "others.cooling": "Cooling System",
  "others.warranty": "Warranty",
}; 

export default function ProductDetailPage({
  product
} : {
  product: typeof sample_products[0]
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const productDescription = [
    {
      key: 'Kích thước màn hình',
      value: product?.specifications.display.screenSize,
    },
    {
      key: 'Độ phân giải',
      value: product?.specifications.display.resolution,
    },
    {
      key: 'Bộ nhớ trong',
      value: product?.specifications.general.ram,
    },
    {
      key: 'Công nghệ màn hình',
      value: product?.specifications.display.panelType,
    },
    {
      key: 'Camera sau',
      value: product?.specifications.camera.rearCamera,
    },
    {
      key: 'Camera trước',
      value: product?.specifications.camera.frontCamera,
    },
    {
      key: 'Kích thước',
      value: product?.specifications.buildAndDesign.dimensions,
    },
    {
      key: 'Chipset',
      value: product?.specifications.general.processor,
    },
  ]

  if (product) {
    const productDetail = Object.entries(product.specifications).flatMap(([section, details]) =>
      Object.entries(details).map(([key, value]) => ({
        key: `${section}.${key}`,
        displayName: keyMappings[`${section}.${key}`] || `${section}.${key}`,
        value: value as string,
      }))
    );

    const relatedProducts = sample_products.filter((relatedProduct) => (
      Math.abs(relatedProduct.netPrice - product.netPrice) <= 5000000 && relatedProduct.category === product.category
    ));

    return (
      <div className="flex flex-col gap-16">
        <section className="grid grid-cols-2 gap-10">
          <div>
            <ProductImageSlider />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4>{product?.name}</h4>
                <div className="flex flex-row items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-1 items-center">
                      <span>5.0</span>
                      <div className="flex flex-row gap-0.5">
                        <Star size={20} weight="duotone" />
                        <Star size={20} weight="duotone" />
                        <Star size={20} weight="duotone" />
                        <Star size={20} weight="duotone" />
                        <Star size={20} weight="duotone" />
                      </div>
                    </div>
                    <span>(<span>18</span> đánh giá)</span>
                  </div>
                  <LineVertical size={24} />
                  <p>đã bán <span>18k</span></p>
                </div>
              </div>
              <h3 className="text-[#FC7D22]">{formatCurrencyVND(product.netPrice)}</h3>
            </div>

            <Listbox
              aria-label="Actions"
              onAction={(key) => alert(key)}
              classNames={{
                base: 'p-0',
              }}
            >
              <ListboxSection
                title={`Phiên bản`}
                classNames={{
                  heading: 'text-base font-bold text-black text-left p-0',
                  group: 'flex flex-row gap-2 text-center text-base',
                }}
              >
                <ListboxItem key="128GB">128GB</ListboxItem>
                <ListboxItem key="256GB">256GB</ListboxItem>
                <ListboxItem key="512GB">512GB</ListboxItem>
                <ListboxItem key="1TB">1TB</ListboxItem>
              </ListboxSection>
              <ListboxSection
                title={`Màu sắc`}
                classNames={{
                  heading: 'text-base font-bold text-black text-left p-0',
                  group: 'flex flex-row gap-2 text-center text-base justify-between',
                }}
              >
                <ListboxItem classNames={{ base: 'flex flex-row gap-1.5 w-fit px-3' }} startContent={<Circle weight="fill" color="#606060" />} key="black">Black Titanium</ListboxItem>
                <ListboxItem classNames={{ base: 'flex flex-row gap-1.5 w-fit px-3' }} startContent={<Circle weight="fill" color="#F8F8F8" />} key="white">White Titanium</ListboxItem>
                <ListboxItem classNames={{ base: 'flex flex-row gap-1.5 w-fit px-3' }} startContent={<Circle weight="fill" color="#D1CBBF" />} key="blue">Natural Titanium</ListboxItem>
                <ListboxItem classNames={{ base: 'flex flex-row gap-1.5 w-fit px-3' }} startContent={<Circle weight="fill" color="#CABDAD" />} key="green">Desert Titanium</ListboxItem>
              </ListboxSection>
            </Listbox>

            <div className="flex flex-row gap-2">
              <Button startContent={<ShoppingCartSimple size={24} weight="duotone" />}>Thêm vào giỏ hàng</Button>
              <Button startContent={<CheckFat size={24} weight="duotone" />}>Thanh toán</Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-[2fr_1fr] gap-10">
          <div className="flex flex-col gap-4 py-4">
            <h3 className="text-[#FC7D22]">Mô tả sản phẩm</h3>
            <p>
              iPhone 16 Pro Max có màn hình OLED 6.9 inch, với công nghệ màn hình Super Retina XDR,
              camera gồm: ống kính Fusion 48MP và Ultra Wide 48MP và camera Telephoto 5x 12MP, kết hợp camera trước 12MP chụp hình sắc nét
              đến từng chi tiết nhỏ, ghi lại những khoảnh khắc bên gia đình. Chiếc điện thoại iPhone 16 mới này được trang bị
              chip A18 Pro với 6 lõi CPU và 6 lõi GPU cùng vớiNeural Engine 16 lõi.
            </p>
            <Accordion isCompact variant="bordered">
              <AccordionItem key="1" aria-label="Nội dung chính" title="Nội dung chính">
                <ol className="list-decimal list-inside text-slate-900 dark:text-slate-200 flex flex-col gap-1.5">
                  <li>Thiết kế hiện đại, cấu hình nổi trội</li>
                  <li>iPhone 16 Pro Max có mấy màu? Màu nào mới xuất hiện?</li>
                  <li>iPhone 16 Pro Max có bao nhiêu phiên bản bộ nhớ?</li>
                  <li>iPhone 16 Pro Max có giá bao nhiêu?</li>
                </ol>
              </AccordionItem>
            </Accordion>
            <h4 className="mt-4">Thiết kế hiện đại, cấu hình nổi trội</h4>
            <p>
              iPhone 16 Pro Max có thiết kế với khung viền vuông sang trọng quen thuộc được hoàn thiện từ titan Cấp 5.
              Chất liệu này giúp điện thoại có một không viền cứng cáp nhưng vẫn đảm bảo được trọng lượng nhẹ của thiết bị.
              Bên trong máy với cải tiến trong cấu hình tản nhiệt giúp máy tản nhiệt hiệu quả hơn đến 20% so với thế hệ trước.
              Mặt lưng máy được hoàn thiện với mặt kính nhám hỗ trợ giảm thiểu hiện tượng bám vân tay khi sử dụng.
            </p>
            <h4 className="mt-4">iPhone 16 Pro Max có mấy màu? Màu nào mới xuất hiện?</h4>
            <p>
              Điện thoại iPhone 16 Pro Max mới 2024 sở hữu 4 phiên bản màu là: Titan Sa Mạc,
              Titan Tự Nhiên, Titan Trắng và Titan Đen. Trong đó, Titan Sa Mạc là bản màu mới
              lần đầu xuất hiện để thay thế cho màu Titan Xanh năm ngoái.
            </p>
            <p>
              Còn lại 3 màu Titan Tự Nhiên, Titan Trắng và Titan Đen vẫn tiếp tục được sử dụng,
              có thể thấy được sự yêu thích của người dùng iPhone đối với những màu sắc này.
              Việc giữ các màu titan cũng giúp tạo nên tính sang trọng và nổi bật, kết hợp với
              khung viền Titanium cao cấp của thiết bị.
            </p>
          </div>
          <Table
            hideHeader
            isStriped
            aria-label="Example static collection table"
            topContent={
              <>
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-[#FC7D22] ml-2">Cấu hình</h3>
                  <Button onPress={onOpen} variant='light' size="sm" endContent={<CaretRight size={16} />} className="flex flex-row gap-1 items-center">Chi tiết</Button>
                </div>
              </>
            }
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
            </TableHeader>
            <TableBody>
              {
                productDescription.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold">{item.key}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>

          <Modal
            backdrop="opaque"
            size="3xl"
            scrollBehavior="inside"
            isOpen={isOpen}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.1,
                    ease: "easeOut",
                  },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
              },
            }}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Cấu hình chi tiết</ModalHeader>
                  <ModalBody>
                    <Table
                      hideHeader
                      isStriped
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {
                          productDetail.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-bold">{item.displayName}</TableCell>
                              <TableCell>{item.value}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                      Đóng
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[#FC7D22]">Đánh giá sản phẩm</h3>
            <Button variant='ghost' startContent={<Plus size={20} />}>Thêm đánh giá</Button>
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col items-center">
              <h1>4.5</h1>
              <div className="flex flex-row gap-0.5">
                <Star size={32} weight="duotone" />
                <Star size={32} weight="duotone" />
                <Star size={32} weight="duotone" />
                <Star size={32} weight="duotone" />
                <Star size={32} weight="duotone" />
              </div>
              <p className="mt-4 hover:underline">18 đánh giá</p>
            </div>
            <div className="flex justify-center items-center w-[600px]">
              <div className="w-full flex flex-col gap-2">
                <Progress aria-label="Loading..." value={90} color="warning" className="min-w-md" />
                <Progress aria-label="Loading..." value={60} color="warning" className="min-w-md" />
                <Progress aria-label="Loading..." value={30} color="warning" className="min-w-md" />
                <Progress aria-label="Loading..." value={10} color="warning" className="min-w-md" />
                <Progress aria-label="Loading..." value={0o5} color="warning" className="min-w-md" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card shadow="sm" isHoverable className="pb-4 px-3 pt-2">
              <CardHeader className="justify-between items-start">
                <div className="flex gap-3">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1.5 items-start justify-center">
                    <h6 className="font-semibold leading-none text-default-600">Zoey Lang</h6>
                    <div className="flex flex-row gap-0.5">
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                    </div>
                  </div>
                </div>
                <p className="text-default-400">03/12/2024</p>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                  Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                </p>
              </CardBody>
            </Card>

            <Card shadow="sm" isHoverable className="pb-4 px-3 pt-2">
              <CardHeader className="justify-between items-start">
                <div className="flex gap-3">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1.5 items-start justify-center">
                    <h6 className="font-semibold leading-none text-default-600">Zoey Lang</h6>
                    <div className="flex flex-row gap-0.5">
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                    </div>
                  </div>
                </div>
                <p className="text-default-400">03/12/2024</p>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                  Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                </p>
              </CardBody>
            </Card>

            <Card shadow="sm" isHoverable className="pb-4 px-3 pt-2">
              <CardHeader className="justify-between items-start">
                <div className="flex gap-3">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1.5 items-start justify-center">
                    <h6 className="font-semibold leading-none text-default-600">Zoey Lang</h6>
                    <div className="flex flex-row gap-0.5">
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                    </div>
                  </div>
                </div>
                <p className="text-default-400">03/12/2024</p>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                  Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                </p>
              </CardBody>
            </Card>

            <Card shadow="sm" isHoverable className="pb-4 px-3 pt-2">
              <CardHeader className="justify-between items-start">
                <div className="flex gap-3">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1.5 items-start justify-center">
                    <h6 className="font-semibold leading-none text-default-600">Zoey Lang</h6>
                    <div className="flex flex-row gap-0.5">
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                      <Star size={20} weight="duotone" />
                    </div>
                  </div>
                </div>
                <p className="text-default-400">03/12/2024</p>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                  Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h4>Sản phẩm liên quan</h4>
          <div className="grid grid-cols-5 gap-4">
            {
              relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Product not found</h1>
    </div>
  )
}