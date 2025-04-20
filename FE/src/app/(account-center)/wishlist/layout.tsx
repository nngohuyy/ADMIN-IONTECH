export default function WishlistLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-8">
      <h3>Sản phẩm yêu thích</h3>
      {children}
    </div>
  )
}