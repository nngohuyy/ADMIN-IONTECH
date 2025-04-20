import ProductCard from "@/components/product-card/ProductCard"
import { sample_products } from "@/database/products"

export default function AppleTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-96 flex bg-[url('/brands/apple_bg.jpg')] bg-cover bg-center rounded-md overflow-hidden"></div>
      <div className="grid grid-cols-4 gap-4">
        {
          sample_products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}