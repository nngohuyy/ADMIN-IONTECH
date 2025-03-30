import { Select, SelectItem } from "@heroui/select";

export const CustomSelect = ({
  label,
  description,
  placeholder,
  options,
  value,
  onChange,
  className,
}: {
  label?: string;
  description?: string;
  placeholder?: string;
  options: { key: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) => {
  return (
    <Select
      className={className}
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
      value={value}
      variant="bordered"
      onValueChange={onChange}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};
