export default function ReviewsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-8">
      <h3>Đánh giá sản phẩm</h3>
      {children}
    </div>
  )
}