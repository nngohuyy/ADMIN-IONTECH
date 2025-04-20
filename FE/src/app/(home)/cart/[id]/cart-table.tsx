export const CartTable = ({
  cartItem,
  // onRemoveItem = () => {},
  // onUpdateQuantity = () => {},
  // onCheckout = () => {},
  // onApplyDiscount = () => {},
  // onUpdateShipping = () => {},
  // onUpdatePayment = () => {},
  // onUpdateBilling = () => {},
  // onUpdateShippingMethod = () => {},
  // onUpdatePaymentMethod = () => {},
}: {
  cartItem: Array<{
    id: number;
    item: {
      itemNo: string;
      name: string;
      size: string;
      color: string;
      image: string;
      description: string;
    };
    price: number;
    quantity: number;
  }>,
  // onRemoveItem?: (id: number) => void;
  // onUpdateQuantity?: (id: number, quantity: number) => void;
  // onCheckout?: () => void;
  // onApplyDiscount?: (code: string) => void;
  // onUpdateShipping?: (address: string) => void;
  // onUpdatePayment?: (method: string) => void;
  // onUpdateBilling?: (billingInfo: string) => void;
  // onUpdateShippingMethod?: (method: string) => void;
  // onUpdatePaymentMethod?: (method: string) => void;
}) => {
  const headerPadding = "pb-2 pt-8";
  const productPadding = "py-8";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 border-b-2 border-gray-300">
            <th className={`${headerPadding}`} colSpan={2}>Sản phẩm</th> 
            <th className={`${headerPadding} text-right`}>Giá</th>
            <th className={`${headerPadding} text-right`}>Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {cartItem && cartItem.map((item) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className={`${productPadding}`}>
                { /* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.item.image} alt={item.item.name} className="h-24 object-cover" />
              </td>
              <td className={`${productPadding}`}>
                <h5 className="uppercase">{item.item.name}</h5>
                <p className="text-medium text-foreground-400">{item.item.description}</p>
                <p className="text-medium text-foreground-400">Size: {item.item.size}</p>
                <p className="text-medium text-foreground-400">Màu sắc: {item.item.color}</p>
              </td>
              <td className="py-6 font-bold text-right">{item.price.toLocaleString()}₫</td>
              <td className="py-6 font-bold text-right">{(item.price * item.quantity).toLocaleString()}₫</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SummaryTable = ({
  cartItem,
}: {
  cartItem: Array<{
    id: number;
    item: {
      itemNo: string;
      name: string;
      size: string;
      color: string;
      image: string;
      description: string;
    };
    price: number;
    quantity: number;
  }>,
}) => {
  const summaryPadding = "py-2";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <tbody>
          <tr className="border-t border-gray-300">
            <td colSpan={2} className={`${summaryPadding} text-left font-bold`}>Tổng cộng:</td>
            <td colSpan={2} className={`${summaryPadding} text-right`}>{cartItem.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}₫</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td colSpan={2} className={`${summaryPadding} text-left font-bold`}>Phí vận chuyển:</td>
            <td colSpan={2} className={`${summaryPadding} text-right`}>Miễn phí</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td colSpan={2} className={`${summaryPadding} text-left font-bold`}>Tổng tiền:</td>
            <td colSpan={2} className={`${summaryPadding} text-right`}>{cartItem.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}₫</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td colSpan={2} className={`${summaryPadding} text-left font-bold`}>Giảm giá:</td>
            <td colSpan={2} className={`${summaryPadding} text-right`}>0₫</td>
          </tr>
          <tr className="border-t-3 border-b-3 border-black">
            <td colSpan={2} className={`${summaryPadding} text-left font-bold`}>Tổng thanh toán:</td>
            <td colSpan={2} className={`${summaryPadding} text-right`}>{cartItem.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}₫</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
