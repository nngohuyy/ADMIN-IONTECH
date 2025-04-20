'use client'
import React, { useState, useEffect } from "react";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, } from "@nextui-org/modal";

import ProfileAddressCard from "@/components/profile-address-card/ProfileAddressCard";
import { vietnamAddress } from "@/constants/vietnamAddress";

const details = [
  {
    name: "NGUYỄN NGÔ HUY",
    address: "282/31/5 Ngô Gia Tự, Phường 04, Quận 10, Thành phố Hồ Chí Minh",
    phone_number: "0961808055",
    type: "Home",
    isDefaultAddress: true,
  },
  {
    name: "NGUYỄN NGÔ HUY",
    address: "15 Trần Bạch Đằng, Phường An Khánh, Quận 2, Thành phố Hồ Chí Minh",
    phone_number: "0961808055",
    type: "Work",
    isDefaultAddress: false,
  },
]

const ListboxWrapper = ({ children } : { children: React.ReactNode }) => (
  <div>
    {children}
  </div>
);

export default function AddressBookPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [districts, setDistricts] = useState<{ Id: string; Name: string; Wards: { Id: string; Name: string; Level: string }[] }[]>([]);
  const [wards, setWards] = useState<{ Id: string; Name: string; Level: string }[]>([]);
  const [type, setType] = useState<string[]>([]);

  useEffect(() => {
    if (province) {
      const selectedProvince = vietnamAddress.find((item) => item.Name === province);
      setDistricts(selectedProvince ? selectedProvince.Districts : []);
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find((item) => item.Name === district);
      if (selectedDistrict) {
        setWards(selectedDistrict.Wards);
      } else {
        setWards([]);
      }
    }
  },
    [district, districts]
  );

  return (
    <div className="flex flex-col gap-4 items-end">
      <Button onPress={onOpen} className="w-fit" startContent={<i className="pi pi-plus"></i>}>Thêm địa chỉ</Button>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.15,
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Địa chỉ giao hàng</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input classNames={{ label: "font-bold" }} placeholder="Nhập họ tên" label="Tên người nhận" labelPlacement="outside" id="old_password" />
                  <Input classNames={{ label: "font-bold" }} placeholder="Nhập số điện thoại" label="Số điện thoại" labelPlacement="outside" id="new_password" />
                  <div className="flex flex-row gap-4">
                    <Select
                      className="max-w-xs"
                      classNames={{ label: "font-bold" }}
                      label="Tỉnh/Thành phố"
                      placeholder="Chọn tỉnh/thành phố"
                      labelPlacement="outside"
                      selectedKeys={[province]}
                      onChange={(e) => setProvince(e.target.value)}
                    >
                      {vietnamAddress.map((province) => (
                        <SelectItem key={province.Name}>{province.Name}</SelectItem>
                      ))}
                    </Select>
                    {/* from the province.Name, selects the according districts */}
                    <Select
                      className="max-w-xs"
                      classNames={{ label: "font-bold" }}
                      label="Quận/Huyện"
                      placeholder="Chọn quận/huyện"
                      labelPlacement="outside"
                      selectedKeys={[district]}
                      onChange={(e) => setDistrict(e.target.value)}
                      isDisabled={!districts.length}
                    >
                      {districts.map((district) => (
                        <SelectItem key={district.Name} value={district.Name}>
                          {district.Name}
                        </SelectItem>
                      ))}
                    </Select>
                    {/* from the district.Name, selects the according wards */}
                    <Select
                      className="max-w-xs"
                      classNames={{ label: "font-bold" }}
                      label="Phường/Xã"
                      placeholder="Chọn phường/xã"
                      labelPlacement="outside"
                      selectedKeys={[ward]}
                      onChange={(e) => setWard(e.target.value)}
                      isDisabled={!wards.length}
                    >
                      {wards.map((ward) => (
                        <SelectItem key={ward.Name} value={ward.Name}>
                          {ward.Name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <Input classNames={{ label: "font-bold" }} placeholder="Nhập tòa nhà, số nhà, tên đường" label="Địa chỉ nhận hàng" labelPlacement="outside" id="confirm_password" />
                  <ListboxWrapper>
                    <Listbox
                      disallowEmptySelection
                      aria-label="Single selection example"
                      selectedKeys={type}
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={(keys) => setType(Array.from(keys as Set<string>))}
                      classNames={{ base: "p-0"}}
                    >
                      <ListboxSection title={`Loại địa chỉ`} classNames={{ heading: "font-bold text-[0.875rem] text-black pl-0" }}>
                        <ListboxItem key="home">Nhà</ListboxItem>
                        <ListboxItem key="work">Cơ quan</ListboxItem>
                      </ListboxSection>
                    </Listbox>
                  </ListboxWrapper>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>Hủy</Button>
                <Button color="primary" onPress={onClose}>Thêm</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 w-full">
        {
          details.map((detail, index) => (
            <ProfileAddressCard key={index} name={detail.name} address={detail.address} phone_number={detail.phone_number} type={detail.type} isDefaultAddress={detail.isDefaultAddress} />
          ))
        }
      </div>
    </div>
  );
}