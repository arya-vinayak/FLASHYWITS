"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



import { SideNavItemType } from "@/types/sidebarProps";
import Sidebar from "@/components/SideBar";





const sidebarItmes: SideNavItemType[] = [
  {
    label: "My Documents",
    href: "/home/preview/",
  },
  {
    label: "Flashcards",
    href: "/home/flashcards",
  },
]


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()


  return (
    //   <main>
    //     <div className="flex h-screen overflow-hidden">
    //     <Header1 />
    //     {children}
    //   </main>
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarItems={sidebarItmes} />
        {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </div>
  )
}