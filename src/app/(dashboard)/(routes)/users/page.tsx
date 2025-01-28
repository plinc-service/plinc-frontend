import { UsersTable } from "@/components/users/UsersTable";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UsersData } from "@/constants/UsersData";

export default function UsersPage() {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="flex h-14 items-center justify-between px-6 ">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Utilisateurs</h1>
        </div>
        <Input
              placeholder="Rechercher"
              className="pl-9 w-[610px] h-9 bg-white border border-neutral-low outline-none"
            />
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 text-sm font-normal bg-white border border-input hover:border-muted-foreground/50 transition-colors"
          >
            Label
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 text-sm font-normal bg-white border border-input hover:border-muted-foreground/50 transition-colors"
          >
            <span>Trier par</span>
            <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <UsersTable users={UsersData} />

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              01
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              02
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              03
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              04
            </Button>
            <span className="mx-2 text-sm text-muted-foreground">...</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              10
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              11
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              12
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-muted-foreground hover:text-foreground"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
