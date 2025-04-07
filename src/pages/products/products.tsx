import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import { CustomTable } from "@/components/table/table";
import {
  columns,
  statusOptions,
  statusColorMap,
  INITIAL_VISIBLE_COLUMNS,
} from "@/pages/products/tableProps";
import { ProductType } from "@/pages/products/tableProps";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://6752ab3ef3754fcea7b92a7d.mockapi.io/sample_products",
        );

        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <CustomTable
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
          columns={columns}
          data={products}
          statusColorMap={statusColorMap}
          statusOptions={statusOptions}
        />
      </div>
    </>
  );
}
