import { Metadata } from "next";
import ProductDetailPage from "./product-detail-page";
import { sample_products } from "@/database/products";
import { slugifyString } from "@/utils/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const product = sample_products.find((p) => slugifyString(p.name) === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.name} | IonTech`,
    description: `Explore the specifications, features, and pricing of ${product.name}.`,
    openGraph: {
      title: product.name,
      description: `Buy ${product.name} now at the best price!`,
      // images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = sample_products.find((p) => slugifyString(p.name) === slug);
  
  if (!product) return <div>Product not found</div>;
  return <ProductDetailPage product={product} />;
}
