"use client";

// import { Switch } from "@/components/ui/Switch";
import { fetchUserById } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { MoveDiagonal } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import UserServicesModal from "./UserServicesModal";

const UserServices: React.FC = () => {
  const { userId } = useParams();
  const [mounted, setMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const MAX_DISPLAYED_SERVICES = 5;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId as string),
    enabled: mounted && !!userId,
  });

  const services = user?.services || [];
  const displayedServices = services.slice(0, MAX_DISPLAYED_SERVICES);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <>
      <div className="p-5 rounded-3xl border border-brand-lower">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-neutral-high font-semibold">Services</h2>
          <button
            className="text-neutral-high hover:text-blue transition-colors"
            onClick={handleOpenModal}
            aria-label="Afficher les détails des services"
          >
            <MoveDiagonal className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
        <div className="space-y-6">
          {services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-high text-base">
                Aucune donnée pour le moment
              </p>
            </div>
          ) : (
            displayedServices.map((service) => (
              <div key={service.id} className="space-y-2">
                <div className="flex items-center justify-start">
                  <div className="flex flex-col">
                    <h3 className="text-blue text-sm font-medium">
                      {service.name}
                    </h3>
                    <span className="text-neutral-medium text-xs">{service.description}</span>
                  </div>
                  {/* <Switch
                    checked={service.is_active}
                  /> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de détails des services */}
      <UserServicesModal
        open={isModalOpen}
        onClose={handleCloseModal}
        services={services}
      />
    </>
  );
};

export default UserServices;