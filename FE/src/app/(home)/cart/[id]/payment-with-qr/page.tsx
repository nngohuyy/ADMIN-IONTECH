export default async function PaymentWithQRPage({
  params,
  amount,
}: {
  params: { id: string }
  amount: number;
}) {
  const { id } = await params;
  amount = 1200000; // Mock amount for testing

  return (
    <div className="py-6">
      <h3>Thanh toán - <span className="font-normal">Giỏ hàng #{id}</span></h3>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-label="QR Code"
        role="img"
        src={`https://api.vietqr.io/image/970448-315521713384-0aco7Lg.jpg?accountName=IONTECH%20DIGITAL&amount=${amount}&addInfo=${id}`}
        alt="QR Code"
        className="w-1/2 h-auto mx-auto"
      />
    </div>
  )
}
