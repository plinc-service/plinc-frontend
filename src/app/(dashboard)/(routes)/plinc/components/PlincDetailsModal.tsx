"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Separator } from "@/components/ui/Separator";
import { PlincTrackingModal } from "./PlincTrackingModal";
import { plincService } from "@/services/PlincService";
import { PlincDetails } from "@/interfaces/plincDetails";
import { getStatusLabel } from "../columns";

interface PlincDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plincId?: string;
  status?: number;
}

export function PlincDetailsModal({
  isOpen,
  onClose,
  plincId,
  status,
}: PlincDetailsModalProps) {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = React.useState(false);
  const [plincDetails, setPlincDetails] = React.useState<PlincDetails | null>(
    null
  );

  useEffect(() => {
    const fetchPlincDetails = async () => {
      if (plincId) {
        try {
          const plincDetail = await plincService.getPlincById(plincId);
          console.log(plincDetail);
          setPlincDetails(plincDetail);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails du plinc :",
            error
          );
        }
      }
    };

    if (isOpen) {
      fetchPlincDetails();
    }
  }, [isOpen, plincId]);

  const getStatusStyle = (
    status: string
  ): { bg: string; dot: string; text: string } => {
    switch (status) {
      case "En attente":
        return {
          bg: "bg-badge-warning-bg",
          dot: "bg-badge-warning-text",
          text: "text-badge-warning-text",
        };
      case "Accepter":
        return {
          bg: "bg-button-secondary-bg",
          dot: "bg-badge-secondary-text",
          text: "text-badge-secondary-text",
        };
      case "Annuler":
        return {
          bg: "bg-badge-danger-bg",
          dot: "bg-danger-background",
          text: "text-danger-background",
        };
      case "Confirmer":
        return {
          bg: "bg-badge-success-bg",
          dot: "bg-success-background",
          text: "text-success-background",
        };
      case "Terminer":
        return {
          bg: "bg-badge-tertiary-bg",
          dot: "bg-neutral-high",
          text: "text-neutral-high",
        };
      case "Rejeter":
        return {
          bg: "bg-badge-danger-bg",
          dot: "bg-danger-background",
          text: "text-danger-background",
        };
      case "En cours":
        return {
          bg: "bg-badge-primary-bg",
          dot: "bg-badge-primary",
          text: "text-badge-primary",
        };
      default:
        return {
          bg: "bg-slate-100",
          dot: "bg-slate-400",
          text: "text-neutral-high",
        };
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 rounded-3xl overflow-hidden">
        <div className="">
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
                Détails Plinc #{plincDetails?.id}
              </h2>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-blue text-base font-medium">
                    {plincDetails?.service?.name}
                  </h3>
                  <p className="text-sm text-neutral-high mt-1">
                    {plincDetails?.service?.category}plincDetails
                  </p>
                </div>
                <span
                  className={`${
                    getStatusStyle(getStatusLabel(status || 0)).bg
                  } ${
                    getStatusStyle(getStatusLabel(status || 0)).text
                  }  px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {getStatusLabel(status || 0)}
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-red-950  ${
                      getStatusStyle(getStatusLabel(status || 0)).dot
                    }`}
                  />
                </span>
              </div>

              <p className="mt-4 text-sm text-neutral-medium">
                {plincDetails?.service?.description}
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
                créé le{" "}
                {plincDetails?.service?.created_at
                  ? formatDate(plincDetails.service.created_at)
                  : "Date de création non disponible"}
              </div>
            </div>

            <Separator className="bg-brand-lower" />

            <div className="p-6">
              <h3 className="text-base font-medium text-neutral-high mb-4">
                Information sur le travail
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-neutral-high font-medium">
                    Coût :
                  </span>
                  <span className="text-sm text-neutral-high ml-2">
                    {plincDetails?.service?.hour_price}€
                  </span>
                </div>

                <div>
                  <span className="text-sm text-neutral-high font-medium">
                    Adresse :
                  </span>
                  <span className="text-sm text-neutral-high ml-2">
                    {plincDetails?.address}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-neutral-high font-medium">
                    Date :
                  </span>
                  <span className="text-sm text-neutral-high ml-2">
                    {plincDetails?.date}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="bg-brand-lower" />

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-neutral-high mb-3 font-medium">
                    Client
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={plincDetails?.client?.image || "/avatar.svg"}
                        alt={plincDetails?.client?.name || "client name"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue">
                        {plincDetails?.client.name}
                      </p>
                      <p className="text-xs text-neutral-high">
                        {plincDetails?.client.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-neutral-high mb-3 font-medium">
                    Prestataire
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={plincDetails?.provider.image || "/avatar.svg"}
                        alt={plincDetails?.provider.name || "provider name"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue">
                        {plincDetails?.provider.name}
                      </p>
                      <p className="text-xs text-neutral-high">
                        {plincDetails?.provider.email}
                      </p>
                    </div>
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
