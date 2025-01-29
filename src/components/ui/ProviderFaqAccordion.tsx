"use client";
import { providerFaqs } from "@/constants/Faqs";
import { useState } from "react";
import AccordionItem from "./AccordionItem";

const ProviderFAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      {providerFaqs.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default ProviderFAQAccordion;
