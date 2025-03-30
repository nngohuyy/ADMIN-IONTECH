import { Plus, TrashSimple } from "@phosphor-icons/react";
import { Button } from "@heroui/button";

import { product_variation } from "@/constants";
import { CustomSelect } from "@/components/select/select";
import { CustomInput } from "@/components/input/input";

export const ProductVariantsAdder = ({
  variants,
  onAddVariant,
  onRemoveVariant,
  onUpdateVariant,
}: {
  variants: { id: number; type: string; name: string }[];
  onAddVariant: () => void;
  onRemoveVariant: (id: number) => void;
  onUpdateVariant: (id: number, key: string, value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {variants.map((variant) => (
        <div
          key={variant.id}
          className="flex flex-row gap-2 justify-between w-full"
        >
          <CustomSelect
            className="w-96"
            options={product_variation}
            placeholder="Select a variation type"
            value={variant.type}
            onChange={(e) => onUpdateVariant(variant.id, "type", e as string)}
          />
          <CustomInput
            placeholder="Variation name"
            value={variant.name}
            onChange={(e) => onUpdateVariant(variant.id, "name", e as string)}
          />
          <Button isIconOnly onPress={() => onRemoveVariant(variant.id)}>
            <TrashSimple size={22} weight="duotone" />
          </Button>
        </div>
      ))}
      <Button
        className="w-fit"
        startContent={<Plus size={18} weight="bold" />}
        onPress={onAddVariant}
      >
        Create new variation
      </Button>
    </div>
  );
};
