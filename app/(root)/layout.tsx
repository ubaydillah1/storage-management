import Header from "@/components/Header";
import MobileNavigaton from "@/components/MobileNavigaton";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar {...currentUser} />
      <section className="w-full">
        <div>
          <MobileNavigaton {...currentUser} />
          <Header />
        </div>
        <div className="h-screen">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
