"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PlincTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plincId: string;
}

const mockTrackingData = {
  id: "PLC24000132A98",
  steps: [
    {
      title: "Demande de PlinC",
      description: "Votre client a fait une demande de PlinC vous pouvez l'accepter ou la rejeter",
      date: "Lundi 30 Septembre à 09:00",
      status: "completed"
    },
    {
      title: "En attente de validation",
      description: "Vous avez accepter la demande de PlinC du client. Le Client procède au payment afin de confirmer sa demande",
      date: "Lundi 30 Septembre à 09:00",
      status: "completed"
    },
    {
      title: "PlinC confirmé",
      description: "Votre client a payé pour la commande. le service peut donc être exécuter a la date convenue",
      date: "Lundi 30 Septembre à 09:00",
      status: "completed"
    },
    {
      title: "Prestation livrée",
      description: "Vous avez exécuter votre tâche. Le client a jusqu'à 2 jours pour confirmer cela. Dans le cas echeant vos sous vous seront transférer",
      date: "Lundi 30 Septembre à 09:00",
      status: "current"
    }
  ]
};

export function PlincTrackingModal({ isOpen, onClose, plincId }: PlincTrackingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogTitle className="sr-only">Suivi de la prestation</DialogTitle>
        <div className="relative">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium text-neutral-high">
                Suivi Plinc #{plincId}
              </h2>
              <p className="text-sm text-neutral-high mt-1">{mockTrackingData.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-5 w-5 text-neutral-high" />
            </button>
          </div>

          <Separator className="bg-brand-lower" />

          <div className="p-6">
            <div className="space-y-6">
              {mockTrackingData.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative flex items-start">
                    <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center ${
                      step.status === 'completed' 
                        ? 'bg-brand-medium' 
                        : step.status === 'current'
                        ? 'bg-white border-2 border-brand-medium'
                        : 'bg-neutral-low'
                    }`}>
                      {step.status === 'completed' && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {step.status === 'current' && (
                        <div className="h-2.5 w-2.5 rounded-full bg-brand-medium" />
                      )}
                    </div>
                    {index < mockTrackingData.steps.length - 1 && (
                      <div className={`absolute left-2.5 top-6 w-[2px] h-[calc(100%+8px)] -ml-px ${
                        step.status === 'completed' ? 'bg-brand-medium' : 'bg-neutral-low'
                      }`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-sm font-medium text-neutral-high">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-high mt-1">
                      {step.description}
                    </p>
                    <p className="text-sm text-neutral-high mt-1">
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-brand-lower" />

          <div className="p-6 flex justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1 border-neutral-low hover:bg-neutral-lowest hover:text-neutral-high"
              onClick={onClose}
            >
              Annuler le plinc
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-brand-lowest text-brand-medium border border-brand-lower hover:bg-brand-lower hover:text-brand-medium"
            >
              Marquer comme terminer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
