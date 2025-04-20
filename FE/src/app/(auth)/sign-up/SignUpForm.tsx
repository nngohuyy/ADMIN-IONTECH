'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { CaretLeft, FacebookLogo, GoogleLogo } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { register } from '@/services/authService';
import { toast } from 'react-toastify';

export default function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register({ name, email, password });
      toast.success('Đăng ký thành công! Vui lòng đăng nhập');
      router.push('/auth/sign-in');
    } catch (err) {
      console.error(err);
      toast.error('Đăng ký thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className="flex flex-col gap-12 w-4/5">
      <Link href="/auth/sign-in">
        <Button startContent={<CaretLeft size={14} />} size="sm" variant="light" className="w-fit">
          Trở lại
        </Button>
      </Link>

      <div className="w-full flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-12 w-full">
          <Image src="/iontech.svg" alt="Logo" width={311} height={48} priority />

          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-2">
              <h2 className="!font-normal">Đăng ký</h2>
              <p>Nhập các thông tin của bạn</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    size="lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Input
                  size="lg"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-row gap-1 ml-auto mr-0">
                <Button variant="solid" color="primary" onClick={handleRegister}>
                  Tạo tài khoản
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-3 w-3/4 items-center">
          <p>hoặc đăng ký bằng</p>
          <div className="flex flex-col gap-2 w-full">
            <Button startContent={<FacebookLogo size={24} weight="fill" />} className="bg-slate-600 text-white">
              Đăng nhập bằng Facebook
            </Button>
            <Button startContent={<GoogleLogo size={24} weight="fill" />} className="bg-slate-600 text-white">
              Đăng nhập bằng Google
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
}