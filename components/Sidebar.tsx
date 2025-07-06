"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();
  return (
    <aside className="max-w-[100px] lg:max-w-[330px] lg:w-full py-4 px-[20px] w-full flex-col justify-between hidden sm:flex">
      <section>
        <Link href="/">
          <div className={`items-center gap-2 w-full flex`}>
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className={`h-auto`}
            />
            <strong className="text-[28px] font-medium lg:block hidden text-primary">
              Stora
            </strong>
          </div>
        </Link>
        <nav className="mt-[20px] lg:mt-[15px]">
          <ul className="flex flex-1 flex-col gap-6">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                return (
                  <li
                    key={item.name}
                    className={cn(
                      "sidebar-nav-item min-w-full!",
                      pathname === item.url && "shad-active"
                    )}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-[10px]"
                    >
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={26}
                        height={26}
                        className={cn("nav-icon w-[26px] h-[26px]", {
                          "nav-icon-active": pathname === item.url,
                        })}
                      />
                      <p className="hidden lg:block">{item.name}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ul>
        </nav>
      </section>

      <div className="lg:block hidden w-full">
        <Image
          src="/assets/images/files-2.png"
          alt="logo"
          width={253}
          height={209}
          className="max-w-[253px]"
        />

        <div className="w-full flex gap-4 py-4">
          <div>
            <Image
              src={avatar}
              alt="avatar"
              width={44}
              height={44}
              className="sidebar-user-avatar w-[44] h-[44]"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-[#333F4E] text-h5">{fullName}</p>
            <p className="text-secondary">{email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
