"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Skeleton } from "../ui/Skeleton";
import ProfileInformation from "./ProfileInformation";

const TopBar = ({ pageName }: { pageName: string }) => {
  const { loading, user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="flex items-center justify-between px-2 py-4 sticky w-full bg-white z-20 top-0">
        <h1 className="text-2xl font-semibold text-neutral-high">{pageName}</h1>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={handleClick}>
            {loading ? (
              <>
                <div className="rounded-full bg-neutral-100 flex items-center justify-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-neutral-100 flex items-center justify-center">
                  {/* <Image
                    src={user?.image_url || "/avatar.svg"}
                    alt={user?.username || "Admin"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  /> */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.image_url} alt={user?.username || "Admin"} />
                    <AvatarFallback>{user?.username
                      ? user.username
                        .trim()
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                      : "AD"}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start text-neutral-high">
                  <span className="font-medium max-w-[137px] truncate w-full">{user?.username || "Admin"}</span>
                  <span className="text-xs max-w-[137px] truncate w-full">{user?.email || " "}</span>
                </div>
              </>
            )}
            <ChevronDown className="h-4 w-4 text-neutral-high" />
          </div>
        </div>
      </div>
      <ProfileInformation
        className={`fixed right-0 top-0 h-full bg-white transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        userImageUrl={user?.image_url || null}
        userName={user?.username || "Admin"}
        userEmail={user?.email || " "}
        onClick={handleClick}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-primary/15 transition-opacity duration-300 ease-in-out"
          onClick={handleClick}
          style={{ opacity: isOpen ? 1 : 0 }}
        />
      )}
    </>
  );
};

export default TopBar;
