import ProviderFAQAccordion from "@/components/ui/ProviderFaqAccordion";
import Title from "@/components/ui/Title";

const Faqs = () => {
  return (
    <section>
      <div className="container pt-11 pb-16">
        <Title>FAQs</Title>
        <p className="text-base text-neutral-high mt-5 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
        <div className="mt-10">
          <ProviderFAQAccordion />
        </div>
      </div>
    </section>
  );
};

export default Faqs;
