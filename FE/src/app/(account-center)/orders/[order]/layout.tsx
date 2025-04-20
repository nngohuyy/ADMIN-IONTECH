export default function OrderDetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-5">
      <h4>Chi tiết đơn hàng</h4>
      {children}
    </div>
  )
}