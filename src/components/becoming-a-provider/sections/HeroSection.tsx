import { Button } from "@/components/ui/Button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-brand-lowest">
      <div className="container w-full min-h-[825px] px-11 grid grid-cols-2 items-center relative">
        <div className="flex justify-center py-16">
          <div className="max-w-[570px] w-full font-bold">
            <h1 className="text-6xl text-primary">
              Gérez vos services et trouvez des clients en un clic.
            </h1>
            <p className="font-normal text-lg text-neutral-high mt-6">
              Développez votre activité, gérez vos réservations et recevez vos
              paiements sans effort. Rejoignez PlinC et simplifiez la gestion de
              votre emploi du temps.
            </p>
            <Button className="rounded-full mt-8 text-base">
              Télécharger PlinC
            </Button>
          </div>
        </div>
        <div className="max-w-[570px] w-full h-full relative overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-4	absolute -top-40">
            <div className="relative w-[277px] h-[340px] overflow-hidden">
              <Image
                src="/plumber.png"
                alt="plumber"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[277px] h-[340px] overflow-hidden">
              <Image
                src="/cleaner.png"
                alt="cleaner"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-[277px] h-[340px] overflow-hidden">
              <Image
                src="/worker.png"
                alt="men worker"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4	absolute top-0 right-0">
            <div className="relative w-[277px] h-[340px] overflow-hidden">
              <Image
                src="/babysister.png"
                alt="babysister"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[277px] h-[340px] overflow-hidden">
              <Image
                src="/gardener.png"
                alt="men gardener"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-[277px] h-[340px] overflow-hidden">
              <Image
                src="/babysister-2.png"
                alt="babysister with baby"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
