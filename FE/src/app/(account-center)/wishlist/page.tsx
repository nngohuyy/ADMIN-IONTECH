import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import { IoRemove } from "react-icons/io5";

const productImage = "https://mac24h.vn/images/detailed/94/macbook_pro_13_inch_intel_m1.jpg";
const productName = "MacBook Pro 14 inch M1 - Space Gray";
const productPrice = "13.490.000₫";

export default function WishlistPage() {
  return (
    <div className='flex justify-between items-center px-6 py-4 rounded-2xl border-2 border-solid border-[#E8ECF4] transition duration-120 hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow-lg active:scale-[98%] active:bg-[#F1F5F9] active:shadow-none'>
      <div className='flex flex-row w-full gap-3'>
        <Image src={productImage} alt="product-image" width={160} height={160} />
        <div className='flex flex-row flex-grow justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>{productName}</p>
            <div className='flex flex-row items-center gap-3'>
              <div className='flex flex-row gap-1'>
                <FaStar size={24}/>
                <FaStar size={24}/>
                <FaStar size={24}/>
                <FaStar size={24}/>
                <FaStar size={24}/>
              </div>
              <p>(<span>14</span> nhận xét)</p>
            </div>
          </div>
          <div className='flex flex-col h-full justify-between items-end'>
            <div className='flex flex-col items-end gap-2'>
              <p className='font-bold text-xl'>{productPrice}</p>
              <p className='flex flex-row gap-3'><span className='line-through'>13.765.000₫</span> | <span>-2%</span></p>
            </div>
            <Button className='w-fit' startContent={<IoRemove />} size='sm'>Xóa</Button>
          </div>
        </div>
      </div>

    </div>
  );
}