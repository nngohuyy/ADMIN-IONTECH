import { Input } from "@heroui/input";

export const CustomInput = ({
  label,
  description,
  placeholder,
  className,
  value,
  onChange,
}: {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <Input
      className={className}
      classNames={{
        inputWrapper: "bg-white",
        label: "font-bold",
        helperWrapper: "mt-1",
      }}
      description={description}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      value={value}
      variant="bordered"
      onValueChange={onChange}
    />
  );
};
