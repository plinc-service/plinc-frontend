"use client";

import { sidebarItems } from "@/constants/Sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutButton from "../ui/LogOutButton";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[250px] flex-col bg-brand-lowest py-2 overflow-scroll">
      <div className="flex h-14 items-center px-4 mt-3">
        <Link href="/">
          <Image
            src="/logo-plinc.svg"
            alt="plinc logo"
            width={69}
            height={30}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </Link>
      </div>

      <div className="flex-1 space-y-5 py-2 mt-3">
        {sidebarItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 min-h-[50px] border-l-3 text-base transition-colors text-neutral-high",
                active
                  ? "bg-white border-blue"
                  : "text-muted-foreground border-transparent",
                item.active === false && "cursor-not-allowed opacity-50 pointer-events-none"
              )}
            >
              {item.icon && (
                <item.icon
                  className={`${active ? "text-blue" : "text-neutral-high"
                    } h-4 w-4`}
                />
              )}
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-2">
        <LogOutButton />
      </div>
    </aside>
  );
}
