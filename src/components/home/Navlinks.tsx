"use client";

import { Navigationlinks } from "@/constants/Navlink";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <ul className={`inline-flex items-center gap-8 ${className}`}>
      {Navigationlinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`transition-colors duration-200 hover:text-blue-600 ${
                isActive ? "text-blue font-medium" : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navlinks;
