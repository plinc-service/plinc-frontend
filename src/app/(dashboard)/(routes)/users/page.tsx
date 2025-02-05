"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Bell, ChevronDown, Search, AlignCenter } from "lucide-react";
import UsersTable from "@/components/users/UsersTable";
import { Input } from "@/components/ui/Input";

const UsersPage: React.FC = () => {
  return (
    <div>
      <div className="flex h-10 items-center justify-between px-2 mx-5 mt-4">
        <h1 className="text-2xl font-semibold">Utilisateurs</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-7 w-7" />
            <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-blue text-[10px] font-medium text-white flex items-center justify-center">
              2
            </span>
          </Button>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="rounded-full bg-neutral-100 flex items-center justify-center">
              <Image
                src="/avatar.svg"
                alt="John DOE"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-start text-neutral-high">
              <span className="font-medium">John DOE</span>
              <span className="text-xs">johndoe@gmail.com</span>
            </div>
            <ChevronDown className="h-4 w-4 text-neutral-high" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mt-5 mb-3 mx-5">
          <div className="relative flex-1 max-w-[610px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
            <Input placeholder="Rechercher" className="pl-9 h-10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-[95px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
              <Input placeholder="Label" className="pl-9 h-10" />
            </div>
            <Button
              variant="outline"
              className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
            >
              <AlignCenter className="h-4 w-4" />
              <span>Trier par</span>
              <ChevronDown className="h-4 w-4 text-neutral-high" />
            </Button>
          </div>
        </div>

        <div className="p-5">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
