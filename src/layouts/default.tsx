import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { BellSimple, MagnifyingGlass, Translate } from "@phosphor-icons/react";

import { Sidebar } from "@/components/sidebar/sidebar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`flex-grow transition-all ${isCollapsed ? "ml-20" : "ml-72"}`}
      >
        <section className="px-8 h-24 flex flex-row justify-between items-center border-b border-gray-200">
          <Input
            classNames={{ inputWrapper: "max-w-lg" }}
            placeholder="Search"
            size="lg"
            startContent={<MagnifyingGlass size={24} weight="light" />}
          />
          <div className="flex flex-row gap-8 items-center">
            <div className="flex flex-row gap-4">
              <Button isIconOnly variant="ghost">
                <Translate size={24} weight="light" />
              </Button>
              <Button isIconOnly variant="ghost">
                <BellSimple size={24} weight="light" />
              </Button>
            </div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform h-12 w-12"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
        <section className="p-8 h-fit-content">{children}</section>
      </main>
    </div>
  );
}

export default DefaultLayout;
