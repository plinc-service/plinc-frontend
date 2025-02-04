"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Bell, ChevronDown } from "lucide-react";
import UsersTable from "@/components/users/UsersTable";

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
        <div className="p-5">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
