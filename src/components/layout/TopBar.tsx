import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";

const TopBar = ({ pageName }: { pageName: string }) => {
  return (
    <div className="flex items-center justify-between p-2 sticky w-full bg-white z-10 top-0">
      <h1 className="text-2xl font-semibold text-neutral-high">{pageName}</h1>
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
  );
};

export default TopBar;
