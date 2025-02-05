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

export const sidebarItems = [
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
    active: true,
  },
  {
    title: "Portefeuille",
    icon: Briefcase,
    href: "/wallet",
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
