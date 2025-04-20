'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { FacebookLogo, GoogleLogo } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { login, loginWithGoogle } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      const token = res.data.token;

      localStorage.setItem('token', token);
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
    }
  };
  const handleGoogleLogin = async (response: any) => {
    const googleToken = response.credential;

    try {
      const res = await loginWithGoogle(googleToken);
      const token = res.data.token;

      localStorage.setItem('token', token);
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Đăng nhập thất bại!');
    }
  };
  return (
    <div className="flex flex-col gap-6 w-4/5 items-center">
      <div className="flex flex-col gap-12 w-full">
        <Image
          src="/iontech.svg"
          alt="Logo"
          width={311}
          height={48}
          priority
        />
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <h2 className='!font-normal'>Đăng nhập</h2>
            <p>để tiếp tục vào tài khoản IonTech của bạn</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Input
                size="lg"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                size="lg"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="/forget-password" className="hover:underline underline-offset-8 text-primary">
  Quên mật khẩu?
</Link>
            </div>

            <div className="flex flex-row gap-1 ml-auto mr-0">
              <Link href="/sign-up">
                <Button variant="light" color="primary">Tạo tài khoản</Button>
              </Link>
              <Button variant="solid" color="primary" onClick={handleLogin}>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-3/4 items-center">
        <p>hoặc đăng nhập bằng</p>
        <div className="flex flex-col gap-2 w-full">
          <Button startContent={<FacebookLogo size={24} weight="fill" />} className="bg-white text-black border">
            Đăng nhập bằng Facebook
          </Button>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error('Đăng nhập thất bại')}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
}