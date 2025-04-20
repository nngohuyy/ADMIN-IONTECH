export default function PaymentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-8">
      <h3>Phương thức thanh toán</h3>
      {children}
    </div>
  )
}