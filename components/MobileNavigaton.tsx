"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants";
import { signOutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FileUploader from "./FileUploader";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigaton = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <div className="flex w-full justify-between items-center px-[20px] py-[10px] bg-background sm:hidden">
      <Link href="/">
        <div className={`items-center gap-2 w-full flex`}>
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={60}
            height={60}
            className={`h-auto`}
          />
          <strong className="text-[28px] font-medium text-primary">
            Stora
          </strong>
        </div>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="bg-background flex gap-3 items-center">
              <Image
                src={avatar}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="sm:hidden lg:block">
                <p className="text-subtitle2 capitalize">{fullName}</p>
                <p className="text-caption">{email}</p>
              </div>
            </SheetTitle>

            <div className="mt-[20px]"></div>

            <nav>
              <ul>
                {navItems.map((item) => {
                  return (
                    <li
                      key={item.name}
                      className={cn(
                        "sidebar-nav-item min-w-full!",
                        pathname === item.url && "shad-active"
                      )}
                    >
                      <Link href={item.url}>
                        <span className="flex items-center gap-2">
                          <Image
                            src={item.icon}
                            alt="icon"
                            width={24}
                            height={24}
                          />
                          <span>{item.name}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div>
              <FileUploader ownerId={ownerId} accountId={accountId} />
            </div>
            <Button className="mt-[20px] w-full flex gap-3 cursor-pointer">
              <LogOut size={24} onClick={async () => await signOutUser()} />
              Logout
            </Button>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigaton;
