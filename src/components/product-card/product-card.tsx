import { Card, CardHeader, CardBody } from "@heroui/card";

import { addProductCard } from "@/components/primitives";

export const ProductCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
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
};
