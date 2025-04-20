'use client'

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, } from "@nextui-org/react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import { CreditCard } from "@phosphor-icons/react";
import { useState } from "react";

const isDefaultPaymentMethod = true;

const MONTHS = [
  { key: 1, value: "Tháng 1" },
  { key: 2, value: "Tháng 2" },
  { key: 3, value: "Tháng 3" },
  { key: 4, value: "Tháng 4" },
  { key: 5, value: "Tháng 5" },
  { key: 6, value: "Tháng 6" },
  { key: 7, value: "Tháng 7" },
  { key: 8, value: "Tháng 8" },
  { key: 9, value: "Tháng 9" },
  { key: 10, value: "Tháng 10" },
  { key: 11, value: "Tháng 11" },
  { key: 12, value: "Tháng 12" },
]

const YEARS = [
  { key: 2026, value: "2026" },
  { key: 2027, value: "2027" },
  { key: 2028, value: "2028" },
  { key: 2029, value: "2029" },
  { key: 2030, value: "2030" },
  { key: 2031, value: "2031" },
  { key: 2032, value: "2032" },
  { key: 2033, value: "2033" },
  { key: 2034, value: "2034" },
  { key: 2035, value: "2035" },
]

export default function PaymentPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rawNumber, setRawNumber] = useState("");
  const [formattedNumber, setFormattedNumber] = useState("");

  const formatCardNumber = (rawNumber: string) => {
    const formattedNumber = rawNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    setFormattedNumber(formattedNumber);
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawNumber = e.target.value;
    setRawNumber(rawNumber);
    formatCardNumber(rawNumber);
  }

  return (
    <div className="grid grid-cols-[3fr_1.5fr] gap-4">
      <div className="flex flex-col gap-5">
        <h4>Thanh toán</h4>
        <div className="flex flex-col gap-4 px-4">

          <div className="flex w-full justify-between items-center px-6 py-4 rounded-2xl border-2 border-solid border-[#E8ECF4] transition duration-120 hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow-xs">
            <div className="flex gap-3">
              <div className="h-10 w-24 flex items-center justify-center rounded-2xl border-2 border-solid border-[#E8ECF4]">
                <Image src={`payment_methods/napas.svg`} alt="Visa" width={60} height={16} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-bold text-lg">**** 1234</p>
                <p className="text-[#AAA]">Ngày hết hạn: <span>06/28</span></p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              {
                isDefaultPaymentMethod ? (
                  <Chip className="pl-2 pr-0 gap-0.5" color="success" variant="light" startContent={<FaCheck size={18} />}>Phương thức mặc định</Chip>
                ) : (
                  <>
                    <Button isIconOnly color="success" startContent={<i className="pi pi-check"></i>}></Button>
                    <Button isIconOnly color="danger" startContent={<MdDelete size={24} />}></Button>
                  </>
                )
              }
            </div>
          </div>

          <div className="flex w-full justify-between items-center px-6 py-4 rounded-2xl border-2 border-solid border-[#E8ECF4] transition duration-120 hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow-xs">
            <div className="flex gap-3">
              <div className="h-10 w-24 flex items-center justify-center rounded-2xl border-2 border-solid border-[#E8ECF4]">
                <Image src={`payment_methods/napas.svg`} alt="Visa" width={60} height={16} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-bold text-lg">**** 1234</p>
                <p className="text-[#AAA]">Ngày hết hạn: <span>06/28</span></p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              {
                !isDefaultPaymentMethod ? (
                  <Chip className="pl-2 pr-0 gap-0.5" color="success" variant="light" startContent={<span className="pi pi-check-circle"></span>}>Phương thức mặc định</Chip>
                ) : (
                  <>
                    <Button variant="light" color="primary">Đặt làm mặc định</Button>
                    <Button isIconOnly color="danger" variant="flat" startContent={<MdDelete size={24} />}></Button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-14">
        <section className="flex flex-col gap-5">
          <h4>Thẻ ngân hàng</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <CreditCard size={30} weight="duotone" />
                <p>Thêm thẻ</p>
              </div>
              <Button color="default" variant="flat" size="sm" onPress={onOpen}>Thêm</Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Phương thức thanh toán</ModalHeader>
                      <ModalBody>
                        <Input
                          label="Chủ thẻ"
                          placeholder="Nhập tên chủ thẻ"
                          labelPlacement="outside"
                        />
                        <Input
                          label="Số thẻ"
                          placeholder="Nhập số thẻ"
                          labelPlacement="outside"
                          value={formattedNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                        <div className="flex flex-row gap-4">
                          <Select
                            className="max-w-xs"
                            label="Hết hạn"
                            placeholder="Chọn tháng"
                            labelPlacement="outside"
                          >
                            {MONTHS.map((month) => (
                              <SelectItem key={month.key}>{month.value}</SelectItem>
                            ))}
                          </Select>
                          <Select
                            className="max-w-xs"
                            label="Năm"
                            placeholder="Chọn năm"
                            labelPlacement="outside"
                          >
                            {YEARS.map((year) => (
                              <SelectItem key={year.key}>{year.value}</SelectItem>
                            ))}
                          </Select>
                          <Input
                            label="CVC"
                            placeholder="Nhập số CVC"
                            labelPlacement="outside"
                          />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Hủy
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Thêm
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <h4>Ví điện tử</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <Image src={`payment_methods/momo.svg`} alt="MoMo" width={30} height={30} />
                <p>MoMo</p>
              </div>
              <Button color="danger" variant="flat" size="sm">Hủy liên kết</Button>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <Image src={`/payment_methods/zalopay.png`} alt="Zalopay" width={30} height={30} />
                <p>Zalopay</p>
              </div>
              <Button color="danger" variant="flat" size="sm">Hủy liên kết</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}