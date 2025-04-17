"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
// import { Switch } from "@/components/ui/Switch";
import { Service } from "@/types/services";
import { X } from "lucide-react";

interface UserServicesModalProps {
  open: boolean;
  onClose: () => void;
  services: Service[];
}

const UserServicesModal: React.FC<UserServicesModalProps> = ({
  open,
  onClose,
  services
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] w-full">
        <div className="space-y-3">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg text-neutral-high font-semibold">
              Services
            </DialogTitle>
            <button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Services list */}
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {services.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-high text-base">
                  Aucun service pour le moment
                </p>
              </div>
            ) : (
              services.map((service) => (
                <div key={service.id} className="py-4 border-b border-b-gray-100 last:border-b-0">
                  <div className="flex items-center justify-start">
                    <div className="flex flex-col">
                      <h3 className="text-blue text-sm font-medium">
                        {service.name}
                      </h3>
                      <span className="text-neutral-medium text-xs">
                        {service.description || "Pas de description"}
                      </span>
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
      </DialogContent>
    </Dialog>
  );
};

export default UserServicesModal;
