'use client'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, } from "@nextui-org/modal";
import { Trash } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';
import { getMe, updateProfile, changePassword, deleteAccount } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { parseDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  
  const [avatar, setAvatar] = useState<string>("https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('other');
  const [dob, setDob] = useState<DateValue | null>(null);
  const { isOpen: isModal1Open, onOpen: openModal1, onOpenChange: onModal1Change } = useDisclosure();
  const { isOpen: isModal2Open, onOpen: openModal2, onOpenChange: onModal2Change } = useDisclosure();

  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Bạn cần đăng nhập để truy cập!');
      router.push('/auth/sign-in'); // ✅ Redirect nếu chưa đăng nhập
    }
    
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        const data = res.data;
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phoneNumber || '');
        setGender(data.gender || 'other');
        setAvatar(data.avatar || avatar);
        setDob(data.dob ? parseDate(data.dob) : null);
      } catch (err) {
        toast.error('Bạn chưa đăng nhập!');
        router.push('/auth/sign-in');
      }
    };

    fetchProfile();
  }, [loading, user]);


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, email, phoneNumber: phone, avatar, gender,  dob: dob ? dob.toString() : undefined });
      toast.success('Cập nhật thành công!');
    } catch (err) {
      toast.error('Cập nhật thất bại!');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword });
      toast.success('Đổi mật khẩu thành công!');
    } catch (err) {
      toast.error('Đổi mật khẩu thất bại!');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success('Tài khoản đã được xóa!');
      localStorage.removeItem('token');
      router.push('/auth/sign-up');
    } catch (err) {
      toast.error('Lỗi khi xóa tài khoản!');
    }
  };
  
  if (loading || !user) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>; 
  }
  return (
    <div className="grid grid-cols-[3fr_1.5fr] gap-4">
      <form className="flex flex-col gap-5">
        <h4>Thông tin cá nhân</h4>
        <div className="flex flex-col gap-14 px-4 items-center">
          <div className="flex flex-col gap-4 items-center">
            {/* eslint-disable */}
            <img
              src={avatar}
              alt="Logo"
              width={120}
              height={120}
              className="rounded-full border-4 border-foreground"
            />
            <div className="flex flex-row gap-2">
              <Button color="danger" className="w-fit" onPress={() => setAvatar("https://api.dicebear.com/9.x/notionists/svg")}>Xóa ảnh</Button>
              <Button color="primary" className="w-fit">Thêm ảnh mới</Button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-[1fr_5fr] gap-6 items-center">
              <p>Họ và tên</p>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ và tên" id="name" />
            </div>
            <div className="grid grid-cols-[1fr_5fr] gap-6 items-center">
              <p>Địa chỉ email*</p>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-[1fr_5fr] gap-6 items-center">
              <p>Số điện thoại*</p>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid grid-cols-[1fr_5fr] gap-6 items-center">
              <p>Ngày sinh</p>
              <DatePicker value={dob ?? undefined} onChange={setDob} />
            </div>
            <div className="grid grid-cols-[1fr_5fr] gap-6 items-center">
              <p>Giới tính</p>
              <RadioGroup orientation="horizontal" value={gender}
  onValueChange={setGender}>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </RadioGroup>
            </div>
          </div>
          <Button className="w-fit" type="submit">Cập nhật</Button>
        </div>
      </form>

      <div className="flex flex-col gap-14">
        <section className="flex flex-col gap-5">
          <h4>Bảo mật</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <i className="text-[1.5rem] pi pi-lock"></i>
                <p>Đổi mật khẩu</p>
              </div>
              <Button color="default" variant="flat" size="sm" onPress={openModal1}>Cập nhật</Button>
              <Modal
                isOpen={isModal1Open}
                onOpenChange={onModal1Change}
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.15,
                        ease: "easeOut",
                      },
                    },
                    exit: {
                      y: -20,
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        ease: "easeIn",
                      },
                    },
                  },
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Đổi mật khẩu</ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col gap-4">
                          <Input classNames={{ label: "font-bold" }} placeholder="Nhập mật khẩu cũ" label="Mật khẩu cũ" labelPlacement="outside" type="password" id="old_password" />
                          <Input classNames={{ label: "font-bold" }} placeholder="Nhập mật khẩu mới" label="Mật khẩu mới" labelPlacement="outside" type="password" id="new_password" />
                          <Input classNames={{ label: "font-bold" }} placeholder="Nhập lại mật khẩu mới" label="Xác nhận mật khẩu mới" labelPlacement="outside" type="password" id="confirm_password" />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="default" onPress={onClose}>Hủy</Button>
                        <Button color="primary" onPress={onClose}>Đổi mật khẩu</Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <h4>Liên kết mạng xã hội</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <i className="text-[1.5rem] pi pi-facebook"></i>
                <p>Facebook</p>
              </div>
              <Button color="default" variant="flat" size="sm">Liên kết</Button>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <i className="text-[1.5rem] pi pi-google"></i>
                <p>Google</p>
              </div>
              <Button color="default" variant="flat" size="sm">Liên kết</Button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <h4>Xóa tài khoản</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center gap-4">
                <i className="text-[1.5rem] pi pi-trash"></i>
                <p>Xóa tài khoản</p>
              </div>
              <Button color="danger" variant="flat" onPress={openModal2}>Xóa</Button>
              <Modal
                isOpen={isModal2Open}
                onOpenChange={onModal2Change}
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.15,
                        ease: "easeOut",
                      },
                    },
                    exit: {
                      y: -20,
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        ease: "easeIn",
                      },
                    },
                  },
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Xóa tài khoản</ModalHeader>
                      <ModalBody>
                        <p>Bạn có chắc chắn muốn xóa tài khoản? Việc này sẽ xóa tất cả dữ liệu của bạn và không thể khôi phục.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="default" onPress={onClose}>Không, quay trở lại</Button>
                        <Button color="danger" onPress={onClose} endContent={<Trash size={24} weight="duotone" />}>Đồng ý, xóa tài khoản</Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}