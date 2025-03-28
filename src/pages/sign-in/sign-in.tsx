import { FormEvent } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export default function SignInPage() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.username.value + "@oisp.fest";
    const password = e.currentTarget.password.value;
    // await signInUser(email, password);

    window.location.href = "/dashboard"; // delete later when signInUser is implemented
  };

  return (
    <form
      className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 text-primary flex flex-col gap-5 max-w-2xl"
      onSubmit={onSubmit}
    >
      <h2 className="text-center font-semibold text-xl">
        IonTech Admin Dashboard
      </h2>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Username</label>
        <Input
          className="rounded-lg px-3 py-2 text-black"
          name="username"
          placeholder="Nhập tên đăng nhập"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Password</label>
        <Input
          className="rounded-lg px-3 py-2 text-black"
          name="password"
          placeholder="Nhập mật khẩu"
          type="password"
        />
      </div>
      <Button className="btn mt-5" type="submit">
        Sign in
      </Button>
    </form>
  )
}