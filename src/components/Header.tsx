"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/auth-slice";
import { Menu, LogOut } from "lucide-react";

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className=" bg-black text-white px-4 md:px-14 ">
        <div className="hidden md:flex justify-between  items-center h-20">
          <div className="flex gap-4">
            <Link href="/" className="hover:text-red-500">
              Список лицевых счетов
            </Link>
            <Link href="/charges" className="hover:text-red-500">
              История начислений
            </Link>
            <Link href="/payments" className="hover:text-red-500">
              История платежей
            </Link>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4 text-black" />
            <span className="text-black">Выйти</span>
          </Button>
        </div>

        {/* Для мобильных устройств */}
        <div className="md:hidden h-20 flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="focus:outline-none  ">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mt-2 fixed right-0 top-0 transform translate-x-4 translate-y-2">
              <DropdownMenuItem asChild>
                <Link href="/">Список ЛС</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/charges">История начислений</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/payments">История платежей</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4 text-black" />
                  <span className="text-black">Выйти</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      ;
    </>
  );
}

export default Header;
