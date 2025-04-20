import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Briefcase, House } from "@phosphor-icons/react/dist/ssr";

interface ProfileAddressCardProps {
  name: string;
  address: string;
  phone_number: string;
  type: string;
  isDefaultAddress: boolean;
}

export default function ProfileAddressCard({ name, address, phone_number, type, isDefaultAddress }: ProfileAddressCardProps) {
  return (
    <div className="flex flex-row justify-between items-start px-6 py-4 rounded-xl border-2 border-solid border-[#E8ECF4]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <p className="font-bold">{name}</p>
          {
            type == "Home"
              ? <Chip className="pl-2 pr-0 gap-0.5" radius="sm" color="default" variant="bordered" startContent={<House weight="duotone" />}>{type}</Chip>
              : <Chip className="pl-2 pr-0 gap-0.5" radius="sm" color="default" variant="bordered" startContent={<Briefcase weight="duotone" />}>{type}</Chip>
          }
          {
            isDefaultAddress && <Chip className="pl-2 pr-0 gap-0.5" color="success" variant="light" startContent={<span className="pi pi-check-circle"></span>}>Địa chỉ mặc định</Chip>
          }
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[#A0A0A0]">Địa chỉ: <span className="text-black">{address}</span></p>
          <p className="text-[#A0A0A0]">Số điện thoại: <span className="text-black">{phone_number}</span></p>
        </div>
      </div>
      {
        isDefaultAddress ? <Button isIconOnly startContent={<i className="pi pi-pencil"></i>}></Button> : (
          <div className="flex gap-2">
            <Button isIconOnly startContent={<i className="pi pi-check-circle"></i>}></Button>
            <Button isIconOnly startContent={<i className="pi pi-pencil"></i>}></Button>
            <Button isIconOnly startContent={<i className="pi pi-trash"></i>}></Button>
          </div>
        )
      }
    </div>
  )
}