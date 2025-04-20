'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Lấy token từ URL
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Liên kết không hợp lệ hoặc đã hết hạn');
      router.push('/sign-in');
    }
  }, [token]);

  const handleSubmit = async () => {
    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post('/api/auth/reset-password', {
        token,
        password,
      });

      toast.success(res.data.message || 'Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        router.push('/sign-in');
      }, 1000);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 flex flex-col gap-4">
      <h3 className="text-xl font-bold">Đặt lại mật khẩu</h3>
      <Input
        type="password"
        label="Mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isRequired
      />
      <Input
        type="password"
        label="Xác nhận mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        isRequired
      />
      <Button
        color="primary"
        onPress={handleSubmit}
        isLoading={isSubmitting}
        isDisabled={!password || !confirmPassword}
      >
        Xác nhận
      </Button>
    </div>
  );
}