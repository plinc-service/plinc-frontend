import {
  ArrowRightLeft,
  Briefcase,
  Building2,
  CheckCircle,
  FileText,
  LayoutDashboard,
  Link2,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
    active: true,
  },
  {
    title: "Utilisateurs",
    icon: Users,
    href: "/users",
    active: true,
  },
  {
    title: "Services",
    icon: Building2,
    href: "/services",
    active: true,
  },
  {
    title: "PlinC",
    icon: Link2,
    href: "/plinc",
    active: true,
  },
  {
    title: "Portefeuille",
    icon: Briefcase,
    href: "/wallet",
    active: true,
  },
  {
    title: "Transactions",
    icon: ArrowRightLeft,
    href: "/transactions",
    active: true,
  },
  {
    title: "Validations",
    icon: CheckCircle,
    href: "/validations",
    active: true,
  },
  {
    title: "Gestion du contenu",
    icon: FileText,
    href: "/content-management",
    active: true,
  },
  {
    title: "Support et litiges",
    icon: ShieldAlert,
    href: "/support",
    active: false,
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/settings",
    active: false,
  },
];
