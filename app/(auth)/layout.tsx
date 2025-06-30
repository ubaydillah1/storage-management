import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-primary text-primary-foreground max-w-[580px] px-14 pt-12 pb-16 lg:flex flex-col justify-between hidden">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-auto"
          />
          <strong className="text-5xl font-medium">Stora</strong>
        </div>

        <div className="space-y-5 w-[430px]">
          <h1 className="heading-1">Manage your files the best way</h1>
          <p className="">
            Awesome, we&apos;ve created the perfect place for you to store all
            your documents.
          </p>
        </div>

        <Image
          src="/assets/images/files.png"
          alt="file"
          width={310}
          height={310}
          className="block mx-auto hover:rotate-2 hover:scale-105 transition-all"
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
