export default function OrdersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-8">
      <h3>Sổ địa chỉ</h3>
      {children}
    </div>
  )
}