"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Link2,
  ArrowRightLeft,
  CheckCircle,
  FileText,
  ShieldAlert,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Utilisateurs",
    icon: Users,
    href: "/users",
  },
  {
    title: "Services",
    icon: Building2,
    href: "/services",
  },
  {
    title: "PlinC",
    icon: Link2,
    href: "/plinc",
  },
  {
    title: "Portefeuille",
    icon: Briefcase,
    href: "/portfolio",
  },
  {
    title: "Transactions",
    icon: ArrowRightLeft,
    href: "/transactions",
  },
  {
    title: "Validations",
    icon: CheckCircle,
    href: "/validations",
  },
  {
    title: "Gestion du contenu",
    icon: FileText,
    href: "/content",
  },
  {
    title: "Support et litiges",
    icon: ShieldAlert,
    href: "/support",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[250px] flex-col bg-brand-lowest p-2">
      <div className="flex h-14 items-center px-4">
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

      <div className="flex-1 space-y-5 p-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-base transition-colors text-neutral-high",
              pathname === item.href ? "bg-white" : "text-muted-foreground"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto p-2">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </Link>
      </div>
    </div>
  );
}
