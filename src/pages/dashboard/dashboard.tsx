import { Button } from "@heroui/button";

import { InfographicCard } from "@/components/card/card";
import { CustomDropdown } from "@/components/dropdown/dropdown";

export const selectRange = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "last_7_days", label: "Last 7 days" },
  { key: "last_30_days", label: "Last 30 days" },
  { key: "this_month", label: "This month" },
  { key: "last_month", label: "Last month" },
  { key: "last_3_months", label: "Last 3 months" },
  { key: "last_6_months", label: "Last 6 months" },
  { key: "last_year", label: "Last year" },
  { key: "custom", label: "Custom" },
];

export const data = [
  {
    title: "Total revenue",
    value: 245450,
    type: "currency",
    percentage: -7,
  },
  {
    title: "New customers",
    value: 684,
    type: "number",
    percentage: 13,
  },
  {
    title: "Repeat purchase rate",
    value: 75.12,
    type: "percentage",
    percentage: 20,
  },
  {
    title: "Average order value",
    value: 2412.23,
    type: "currency",
    percentage: -30,
  },
  {
    title: "Conversion rate",
    value: 32.65,
    type: "percentage",
    percentage: 40,
  },
];

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <h4>Welcome back, {`Orion Obe`}!</h4>
          <p>Here&apos;s what happening with your store today.</p>
        </div>
        <div className="flex flex-row gap-2">
          <CustomDropdown selectRange={selectRange} />
          <Button>View all time</Button>
        </div>
      </section>
      <section className="grid grid-cols-5 gap-6">
        {data.map((item, index) => (
          <InfographicCard key={index} {...item} />
        ))}
      </section>
    </main>
  );
}
