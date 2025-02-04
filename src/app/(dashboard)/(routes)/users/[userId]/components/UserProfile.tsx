"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface UserProfileProps {
  user: {
    id: string;
    username: string;
    email: string;
    company: string;
    profession: string;
    phone: string;
    city: string;
    address: string;
    siret: string;
    iban: string;
    stats: {
      acheter: number;
      vendeurs: number;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-brand-lowest rounded-2xl p-5">
      <h1 className="text-lg text-neutral-high font-semibold p-4">
        User {user.id}
      </h1>

      <div className="flex m-2">
        <div className="flex flex-col items-center pr-4 w-[250px] relative">
          <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/avatar.svg"
              alt={user.username}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>

          <div className="mt-3 text-center">
            <h2 className="text-lg font-medium text-blue">{user.username}</h2>
            <p className="text-xs text-neutral-high">{user.email}</p>
            <p className="text-xs text-blue font-semibold my-2">
              {user.company}
            </p>
          </div>

          <div className="mt-4 w-full flex justify-around text-neutral-high">
            <div className="flex flex-col items-center relative px-6">
              <span className="text-2xl font-bold">{user.stats.acheter}</span>
              <span className="text-xs">Acheter</span>
              <Separator
                orientation="vertical"
                className="absolute right-0 h-12"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{user.stats.vendeurs}</span>
              <span className="text-xs">Vendeurs</span>
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="absolute right-0 h-full"
          />

          <Link 
            href={`/users/${user.id.replace("#", "")}/plincs`}
            className="text-sm mt-4 bg-blue text-white p-2.5 rounded-full w-full block text-center hover:bg-blue/90 transition-colors"
          >
            Voir les plincs
          </Link>
        </div>

        <div className="flex-1 pl-4 px-4">
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-neutral-high">
                Profession
              </h3>
              <p className="text-sm font-medium text-blue">{user.profession}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-medium text-neutral-high">Phone</h3>
              <p className="text-sm font-medium text-blue">{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 my-5">
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-neutral-high">
                Ville
              </h3>
              <p className="text-sm font-medium text-blue">{user.city}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-medium text-neutral-high">Adresse</h3>
              <p className="text-sm font-medium text-blue">{user.address}</p>
            </div>
          </div>


          <div className="grid grid-cols-1">
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-neutral-high">
                SIRET
              </h3>
              <p className="text-sm font-medium text-blue">{user.siret}</p>
            </div>

            <div className="space-y-1 my-5">
              <h3 className="text-xs font-medium text-neutral-high">IBAN</h3>
              <p className="text-sm font-medium text-blue">{user.iban}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
