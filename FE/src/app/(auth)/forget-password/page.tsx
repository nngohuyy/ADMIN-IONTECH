'use client';

import { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      toast.success(res.data.message);

      // Optional: Lưu token tạm hoặc trạng thái nếu cần
      // localStorage.setItem('resetToken', res.data.token);

      // Chuyển hướng sau 1s để người dùng kịp thấy toast
      setTimeout(() => {
        router.push('/reset-password');
      }, 1000);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gửi yêu cầu thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 flex flex-col gap-4">
      <h3 className="text-xl font-bold">Quên mật khẩu</h3>
      <a className="text-l font-bold">Vui lòng nhập mail reset mật khẩu</a>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        isRequired
      />
      <Button
        onPress={handleSubmit}
        color="primary"
        isLoading={isLoading}
        isDisabled={!email}
      >
        Reset mật khẩu
      </Button>
    </div>
  );
}