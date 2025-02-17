"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Switch } from "@/components/ui/Switch";
import { MoveDiagonal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/services/UserService";

const UserServices: React.FC = () => {
  const { userId } = useParams();
  const [mounted, setMounted] = React.useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId as string),
    enabled: mounted && !!userId,
  });

  const services = user?.services || [];

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // const handleToggle = (id: number) => (enabled: boolean) => {
  //   // console.log(`Service ${id} toggled to ${enabled}`);
  // };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-5 rounded-3xl border border-brand-lower animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-24 bg-neutral-200 rounded" />
          <div className="h-5 w-5 bg-neutral-200 rounded" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-5 w-48 bg-neutral-200 rounded" />
                <div className="h-6 w-10 bg-neutral-200 rounded" />
              </div>
              <div className="h-4 w-full bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-3xl border border-brand-lower">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-neutral-high font-semibold">Services</h2>
        <button className="text-neutral-high hover:text-blue transition-colors">
          <MoveDiagonal className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-6">
        {services.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-high text-base">
              Aucun service pour cet utilisateur
            </p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-blue text-base font-medium">
                  {service.description}
                </h3>
                <Switch
                  checked={service.enabled}
                  // onCheckedChange={handleToggle(service.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserServices;
