import { useLocation } from "react-router-dom";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import {
  ChartPieSlice,
  Gear,
  Layout,
  List,
  Package,
  Question,
  SquaresFour,
  Star,
  TextIndent,
  TextOutdent,
  UserGear,
  UserList,
} from "@phosphor-icons/react";

export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) => {
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Layout size={28} />,
      iconHightlight: <Layout size={28} weight="fill" />,
    },
    {
      title: "Products",
      path: "/products",
      icon: <Package size={28} />,
      iconHightlight: <Package size={28} weight="fill" />,
    },
    {
      title: "Categories",
      path: "/categories",
      icon: <SquaresFour size={28} />,
      iconHightlight: <SquaresFour size={28} weight="fill" />,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <ChartPieSlice size={28} />,
      iconHightlight: <ChartPieSlice size={28} weight="fill" />,
    },
    {
      title: "Customers",
      path: "/customers",
      icon: <UserGear size={28} />,
      iconHightlight: <UserGear size={28} weight="fill" />,
    },
    {
      title: "Reviews",
      path: "/reviews",
      icon: <Star size={28} />,
      iconHightlight: <Star size={28} weight="fill" />,
      badge: "100",
    },
  ];

  const accountItems = [
    {
      title: "Settings",
      path: "/settings",
      icon: <Gear size={28} />,
      iconHightlight: <Gear size={28} weight="fill" />,
    },
    {
      title: "Help",
      path: "/help",
      icon: <Question size={28} />,
      iconHightlight: <Question size={28} weight="fill" />,
    },
    {
      title: "Manage Users",
      path: "/users",
      icon: <UserList size={28} />,
      iconHightlight: <UserList size={28} weight="fill" />,
    },
  ];

  return (
    <aside
      className={`min-h-screen fixed top-0 z-50 bg-orange-50 flex flex-col transition-all ${isCollapsed ? "w-20" : "w-72"
        }`}
    >
      {/* Header */}
      <div className="px-4 h-24 flex flex-row justify-between items-center">
        {!isCollapsed && (
          <img alt="IonTech" className="h-6 pl-2" src="/iontech.svg" />
        )}
        {isCollapsed ? (
          <Button isIconOnly variant="light" onPress={toggleSidebar}>
            <TextIndent size={28} />
          </Button>
        ) : (
          <Button isIconOnly variant="light" onPress={toggleSidebar}>
            <TextOutdent size={28} />
          </Button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex px-4 py-8 flex-grow flex-col gap-6">
        <Listbox classNames={{ base: "p-0", list: "gap-6" }}>
          {/* GENERAL SECTION */}
          <ListboxSection
            classNames={{
              heading: `text-base pl-2 ${isCollapsed ? "hidden" : ""}`,
              group: "data-[has-title=true]:pt-2 pt-3",
            }}
            title="GENERAL"
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.path}
                classNames={{
                  base: `py-2 gap-3 flex items-center transition-all hover:!bg-orange-100 hover:!text-orange-700 ${location.pathname === item.path
                    ? "bg-orange-200 text-orange-700 rounded-lg"
                    : ""
                    }`,
                  title: isCollapsed ? "hidden" : "text-base",
                }}
                endContent={
                  !isCollapsed && item.badge ? (
                    <Chip color="warning" size="sm" variant="flat">
                      {item.badge}
                    </Chip>
                  ) : null
                }
                href={item.path}
                startContent={
                  location.pathname === item.path
                    ? item.iconHightlight
                    : item.icon
                }
              >
                {!isCollapsed && item.title}
              </ListboxItem>
            ))}
          </ListboxSection>

          {/* ACCOUNT SECTION */}
          <ListboxSection
            classNames={{
              heading: `text-base pl-2 ${isCollapsed ? "hidden" : ""}`,
              group: "data-[has-title=true]:pt-2 pt-3",
            }}
            title="ACCOUNT"
          >
            {accountItems.map((item) => (
              <ListboxItem
                key={item.path}
                classNames={{
                  base: `py-2 gap-3 flex items-center transition-all hover:!bg-orange-100 hover:!text-orange-700 ${location.pathname === item.path
                    ? "bg-orange-200 text-orange-700 rounded-lg"
                    : ""
                    }`,
                  title: isCollapsed ? "hidden" : "text-base",
                }}
                href={item.path}
                startContent={
                  location.pathname === item.path
                    ? item.iconHightlight
                    : item.icon
                }
              >
                {!isCollapsed && item.title}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </div>
    </aside>
  );
};
