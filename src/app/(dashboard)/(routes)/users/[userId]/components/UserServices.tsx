"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/Switch";
import { ArrowUpRight } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}

const UserServices: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Arrosage de Jardin",
      description:
        "Tonte de pelouse, arrosage, et fertilisation pour un jardin toujours vert et soigné.",
      enabled: false,
    },
    {
      id: 2,
      title: "Aménagement paysager",
      description:
        "Conception de jardins, plantation d'arbres et de fleurs pour un espace extérieur harmonieux.",
      enabled: false,
    },
    {
      id: 3,
      title: "Aménagement paysager",
      description:
        "Conception de jardins, plantation d'arbres et de fleurs pour un espace extérieur harmonieux.",
      enabled: false,
    },
  ]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (id: number) => (enabled: boolean) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, enabled } : service
      )
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-neutral-high font-semibold">Services</h2>
        <button className="text-neutral-high hover:text-blue transition-colors">
          <ArrowUpRight className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-blue text-base font-medium">
                {service.title}
              </h3>
              <Switch
                checked={service.enabled}
                onCheckedChange={handleToggle(service.id)}
              />
            </div>
            <p className="text-neutral-high text-xs">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserServices;
