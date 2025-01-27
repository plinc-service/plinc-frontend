import { Button } from "@/components/ui/Button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-brand-lowest">
      <div className="container w-full px-11 py-16 grid grid-cols-2 items-center relative">
        <div className="flex justify-center">
          <Image
            src={"/women.webp"}
            alt="women with her phone"
            className="w-[50%] h-full"
            width={407}
            height={590}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="max-w-[560px] font-bold">
          <h1 className="text-6xl text-primary">
            Réservez vos services en un clic, sans tracas.
          </h1>
          <p className="font-normal text-lg text-neutral-high mt-6">
            Trouvez des prestataires de confiance, planifiez vos rendez-vous en
            toute simplicité, et payez en ligne, le tout sur une seule
            plateforme. Téléchargez PlinC et transformez vos tâches quotidiennes
            en un jeu d&apos;enfant.
          </p>
          <Button className="rounded-full mt-8 text-base">
            Télécharger PlinC
          </Button>
        </div>
        <div className="flex items-center justify-around bg-white rounded-3xl w-full max-w-[964px] absolute left-[50%] bottom-11 -translate-x-[50%] p-5">
          <div className="flex items-center gap-2.5">
            <Image
              src={"/material-symbols_household-supplies.svg"}
              alt="supplies icon"
              width={20}
              height={20}
            />
            <h4 className="text-neutral-high text-sm">Ménage</h4>
          </div>
          <div className="flex items-center gap-2.5">
            <Image
              src={"/icon-park-solid_chimney.svg"}
              alt="chimney icon"
              width={20}
              height={20}
            />
            <h4 className="text-neutral-high text-sm">Ramonage</h4>
          </div>
          <div className="flex items-center gap-2.5">
            <Image
              src={"/baby-carriage-fill.svg"}
              alt="baby carriage icon"
              width={20}
              height={20}
            />
            <h4 className="text-neutral-high text-sm">Babysitting</h4>
          </div>
          <div className="flex items-center gap-2.5">
            <Image
              src={"/mdi_gardening.svg"}
              alt="gardening icon"
              width={24}
              height={24}
              style={{ width: "auto", height: "auto" }}
            />
            <h4 className="text-neutral-high text-sm">Jardinage</h4>
          </div>
          <div className="flex items-center gap-2.5">
            <Image
              src={"/ic_twotone-plumbing.svg"}
              alt="plumbing icon"
              width={20}
              height={20}
            />
            <h4 className="text-neutral-high text-sm">Plomberie</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
