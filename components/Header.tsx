import Search from "@/components/Search";
import React from "react";
import FileUploader from "./FileUploader";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="items-center justify-between hidden sm:flex h-[90px] pr-[20px]">
      <Search />
      <div className="flex-center gap-4">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button cursor-pointer">
            <LogOut size={24} />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
