/** @format */

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/public/rentez.svg"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FileIcon } from "lucide-react"
import { RiArrowLeftDoubleFill } from "react-icons/ri"


import { cn } from "@/lib/utils"

interface SideNavItemType {
  label: string
  href: string
  onItemClick?: (href: string) => void
}

type Props = {
  sidebarItems: SideNavItemType[],
}

export default function Sidebar({ sidebarItems}: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div
      className={cn(
        "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] pl-[50px]",
        isSidebarOpen && "md:w-[300px]"
      )}
    >
      {/* sidenavitems */}
      {sidebarItems.map((d, i) => (
        <HoverContainer key={i}>
          <SideNavItem
            href={d.href}
            isSidebarOpen={isSidebarOpen}
            label={d.label}
            onItemClick={d.onItemClick}
          />
        </HoverContainer>
      ))}

      {/* toggle button  */}
      <section
        className={cn(
          "hidden md:flex w-ful  justify-end",
          !isSidebarOpen && "justify-start"
        )}
      >
        <HoverContainer>
          <RiArrowLeftDoubleFill
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={cn(
              "text-gray-400 transition-all text-4xl",
              !isSidebarOpen && "rotate-180"
            )}
          />
        </HoverContainer>
      </section>
    </div>
  )
}

function SideNavItem({
  href,
  isSidebarOpen,
  label,
  onItemClick
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const [animationParent] = useAutoAnimate()
  const pathname = usePathname()
  const isActivePage = pathname == href
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center cursor-pointer"
    >
        <FileIcon className="w-4 h-4" />
      {/* label */}
      {isSidebarOpen && (
        <p
          className={cn(
            "text-xl hidden md:block pr-4  transition-all ",
            isActivePage && "font-bold"
          )}
        >
          {label}
        </p>
      )}
    </Link>
  )
}

function HoverContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="p-3 transition-all rounded-full cursor-pointer hover:bg-gray-200 w-fit dark:hover:bg-zinc-900 group-hover:dark:bg-zinc-900 group-hover:bg-gray-200">
      {children}
    </div>
  )
}
