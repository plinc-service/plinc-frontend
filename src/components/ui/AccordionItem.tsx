import { AccordionItemProps } from "@/interfaces/interface";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(0);
  const handleToggle = () => {
    onClick();
    if (contentRef.current) {
      setHeight(isOpen ? 0 : contentRef.current.scrollHeight);
    }
  };
  return (
    <div className=" border-b border-neutral-low overflow-hidden">
      <button
        className={`${
          isOpen ? "bg-transparent" : ""
        } flex justify-between items-center w-full p-4 text-sm sm:text-base md:text-xl text-left cursor-pointer transition-colors`}
        onClick={handleToggle}
      >
        <h4 className="font-medium text-neutral-high text-lg">{question}</h4>
        <span className="min-w-7 min-h-7">
          <ChevronDown
            className={`transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? height : 0 }}
        className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
      >
        <div className="p-4 text-neutral-high">
          <p className="text-xs sm:text-sm md:text-base">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
