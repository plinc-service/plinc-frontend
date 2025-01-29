import { Button } from "@/components/ui/Button";
import Title from "@/components/ui/Title";

const CallToAction = () => {
  return (
    <section>
      <div className="container pt-11 pb-16 flex flex-col items-center">
        <Title>Vous avez des questions ?</Title>
        <p className="text-base text-neutral-high mt-5 text-center">
          Contactez nous pour en savoir pluss
        </p>
        <Button
          variant="outline"
          className="rounded-full border-button-tertiary-border text-neutral-high mt-5"
        >
          Contactez-nous
        </Button>
      </div>
      <div className="mt-10 bg-brand-lower py-28">
        <div className="container flex justify-center items-start ">
          <h3 className="text-5xl font-bold max-w-[540px]">
            Rejoignez-nous dès maintenant
          </h3>
          <div>
            <p className="text-lg text-neutral-high max-w-[540px] mb-10">
              Accédez à des prestataires de confiance et simplifiez votre
              quotidien grâce à notre application facile à utiliser.
            </p>
            <Button className="rounded-full">Télécharger PlinC</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
