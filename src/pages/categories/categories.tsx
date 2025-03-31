import { Helmet } from "react-helmet-async";

import CustomTable from "@/components/table/table";

export default function CategoriesPage() {
  return (
    <>
      <Helmet>
        <title>Categories | IonTech</title>
        <meta content="Categories page" name="description" />
        <link href="/categories" rel="canonical" />
        <meta content="Categories" property="og:title" />
      </Helmet>
      <div>
        <CustomTable />
      </div>
    </>
  );
}
