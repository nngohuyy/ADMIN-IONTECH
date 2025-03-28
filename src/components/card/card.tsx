import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { TrendDown, TrendUp } from "@phosphor-icons/react";

interface InfographicCardProps {
  title: string;
  value: number;
  type: string;
  percentage?: number;
}

export const InfographicCard = ({
  title,
  value,
  type,
  percentage,
}: InfographicCardProps) => {
  return (
    <Card className="bg-orange-100" shadow="none">
      <CardHeader className="p-4">
        <p>{title}</p>
      </CardHeader>
      <CardBody className="px-3 py-0">
        {type === "currency" ? (
          <h3>
            {value.toLocaleString("vn-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h3>
        ) : type === "percentage" ? (
          <h3>{value}%</h3>
        ) : (
          <h3>{value}</h3>
        )}
      </CardBody>
      <CardFooter>
        {percentage ? (
          <Chip
            avatar={
              percentage > 0 ? (
                <TrendUp color="#008236" size={32} weight="bold" />
              ) : (
                <TrendDown color="#c10007" size={32} weight="bold" />
              )
            }
            className={`bg-white ${percentage > 0 ? "text-green-700" : "text-red-700"} gap-0.5 px-2`}
            classNames={{ content: "font-bold" }}
            size="sm"
          >
            {percentage}%
          </Chip>
        ) : (
          <Chip color="default" size="sm">
            N/A
          </Chip>
        )}
      </CardFooter>
    </Card>
  );
};
