import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { WalletDetailsPopupProps } from "@/interfaces/walletInterface";
import {
  AlignCenter,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/Dialog";
import { Input } from "../ui/Input";

const WalletDetailsPopup: React.FC<WalletDetailsPopupProps> = ({
  open,
  onClose,
  walletDetails,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] w-full">
        <div className="space-y-3">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg text-neutral-high font-medium">
              Détails des paiements du vendeur
            </DialogTitle>
            <Button variant="ghost" onClick={onClose}>
              <X />
            </Button>
          </div>

          {/* CONTENU */}
          {walletDetails ? (
            <div className="space-y-5">
              {/* INFORMATIONS UTILISATEUR */}
              <div className="flex justify-between items-center border border-neutral-low rounded-3xl p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      walletDetails.user?.image_url ||
                      "https://placehold.co/50x50/png"
                    }
                    alt={walletDetails.user?.username || "User"}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <DialogDescription className="text-sm font-semibold text-blue-600">
                      {walletDetails.user?.username || "Inconnu"}
                    </DialogDescription>
                    <p className="text-neutral-high text-xs">
                      {walletDetails.user?.email || "Email inconnu"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-neutral-high text-sm">Solde actuel</p>
                  <p className="flex items-center gap-1 text-2xl text-blue font-semibold">
                    <Image
                      src="/icons/euro.svg"
                      alt="euro icon"
                      width={14}
                      height={14}
                    />
                    {walletDetails.user?.revenue_total || "00"}
                  </p>

                  {walletDetails.user?.revenue_waiting !== null && (
                    <p className="text-sm text-neutral-high mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-badge-warning-bg rounded-full block"></span>
                      <span className="text-xs font-medium">
                        {walletDetails.user?.revenue_waiting || " "}€
                      </span>
                      <span className="text-xxs">en cours</span>
                    </p>
                  )}
                </div>
              </div>

              {/* HISTORIQUE DES TRANSACTIONS */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-high">
                  Historique des transactions
                </h3>
                <div className="flex items-center justify-between mt-5 gap-4">
                  <div className="relative flex-1 max-w-[610px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
                    <Input placeholder="Rechercher" className="pl-9 h-10" />
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
                  >
                    <AlignCenter className="h-4 w-4" />
                    <span className="text-neutral-high">Trier par</span>
                    <ChevronDown className="h-4 w-4 text-neutral-high" />
                  </Button>
                </div>

                {/* LISTE DES TRANSACTIONS */}
                <div className="mt-4 space-y-[18px]">
                  {walletDetails.transactions?.length > 0 ? (
                    <ScrollArea className="h-[290px]">
                      {walletDetails.transactions.map((transaction, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-between gap-2.5 h-[85px] border-b border-neutral-low pb-[18px]"
                        >
                          <div className="flex items-center w-full justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`${
                                  transaction.type === "retrait"
                                    ? "bg-danger-background border-danger-border"
                                    : "bg-success-background border-success-border"
                                } border rounded-full w-7 h-7 flex items-center justify-center`}
                              >
                                {transaction.type === "retrait" ? (
                                  <ArrowUpRight
                                    className="text-danger"
                                    size={16}
                                  />
                                ) : (
                                  <ArrowDownRight
                                    className="text-success"
                                    size={16}
                                  />
                                )}
                              </span>
                              <div>
                                <h5 className="text-base font-semibold text-neutral-high">
                                  {transaction.type === "retrait"
                                    ? "Retrait"
                                    : "Payement PlinC"}
                                </h5>
                                <p className="text-sm text-neutral-high">
                                  {transaction.user.services?.[0]
                                    ?.description || "Aucune description"}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`${
                                transaction.type === "retrait"
                                  ? "text-danger"
                                  : "text-success"
                              } block text-base`}
                            >
                              {transaction.type === "retrait" ? "-" : "+"}
                              {transaction.amount}€
                            </span>
                          </div>
                          <span className="text-neutral-high text-sm">
                            {(() => {
                              const date = new Date(
                                transaction.created_at
                              ).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "2-digit",
                                month: "long",
                              });

                              const time = new Date(
                                transaction.created_at
                              ).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              });

                              const formattedDate = date.replace(/\b\w/g, (c) =>
                                c.toUpperCase()
                              );

                              return `${formattedDate} à ${time}`;
                            })()}
                          </span>
                        </div>
                      ))}
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  ) : (
                    <p className="text-sm text-neutral-medium">
                      Aucune transaction disponible.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-neutral-medium">
              Chargement des détails...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDetailsPopup;
