import { Helmet } from "react-helmet-async";

import CustomTable from "@/components/table/table";

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Products | IonTech</title>
        <meta
          content="Add a new product to your IonTech e-commerce store."
          name="description"
        />
      </Helmet>
      <div>
        <CustomTable />
      </div>
    </>
  );
}
