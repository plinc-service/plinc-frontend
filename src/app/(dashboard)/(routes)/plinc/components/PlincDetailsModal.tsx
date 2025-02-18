"use client";

import React from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/Button";
import { PlincTrackingModal } from "./PlincTrackingModal";

interface PlincDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plincId?: string;
}

const mockPlincDetails = {
  id: "23475",
  title: "Arrosage de Jardin",
  category: "Jardinage . Entretien",
  description: "Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.",
  cost: "75 EUROS",
  address: "23 RUE DE LILAS",
  date: "Lundi 30 Septembre à 09:00",
  createdAt: "12-12-2024",
  client: {
    name: "John DOE",
    email: "johndoe@gmail.com",
    image: "/avatar.svg"
  },
  provider: {
    name: "John DOE",
    email: "johndoe@gmail.com",
    image: "/avatar.svg"
  }
};

export function PlincDetailsModal({ isOpen, onClose, plincId }: PlincDetailsModalProps) {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = React.useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 rounded-3xl overflow-hidden">
        <DialogTitle className="sr-only">Détails du PlinC</DialogTitle>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-5 w-5 text-neutral-high" />
          </button>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-neutral-high mb-1">
              Détails Plinc #{mockPlincDetails.id}
            </h2>

            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="text-blue text-base font-medium">
                  {mockPlincDetails.title}
                </h3>
                <p className="text-sm text-neutral-high mt-1">
                  {mockPlincDetails.category}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-500">
                En attente
              </span>
            </div>

            <p className="mt-4 text-sm text-neutral-medium">
              {mockPlincDetails.description}
            </p>

            <button 
              className="mt-4 inline-flex items-center text-sm font-medium text-blue bg-badge-secondary-bg p-3 rounded-full"
              onClick={() => setIsTrackingModalOpen(true)}
            >
              <span>Suivi de la prestation</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>

            <PlincTrackingModal
              isOpen={isTrackingModalOpen}
              onClose={() => setIsTrackingModalOpen(false)}
              plincId={plincId || ""}
            />

            <div className="mt-6 text-right text-sm text-neutral-medium">
              créé le {mockPlincDetails.createdAt}
            </div>
          </div>

          <Separator className="bg-brand-lower" />

          <div className="p-6">
            <h3 className="text-base font-medium text-neutral-high mb-4">
              Information sur le travail
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-neutral-high font-medium">Coût :</span>
                <span className="text-sm text-neutral-high ml-2">{mockPlincDetails.cost}</span>
              </div>

              <div>
                <span className="text-sm text-neutral-high font-medium">Adresse :</span>
                <span className="text-sm text-neutral-high ml-2">{mockPlincDetails.address}</span>
              </div>

              <div>
                <span className="text-sm text-neutral-high font-medium">Date :</span>
                <span className="text-sm text-neutral-high ml-2">{mockPlincDetails.date}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-brand-lower" />

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-neutral-high mb-3 font-medium">Client</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={mockPlincDetails.client.image}
                      alt={mockPlincDetails.client.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue">
                      {mockPlincDetails.client.name}
                    </p>
                    <p className="text-xs text-neutral-high">
                      {mockPlincDetails.client.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-neutral-high mb-3 font-medium">Prestataire</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={mockPlincDetails.provider.image}
                      alt={mockPlincDetails.provider.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue">
                      {mockPlincDetails.provider.name}
                    </p>
                    <p className="text-xs text-neutral-high">
                      {mockPlincDetails.provider.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
