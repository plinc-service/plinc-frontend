"use client";
import Title from "@/components/ui/Title";
import { howIstWorkProviderSlideData } from "@/constants/HowItsWorkSlide";
import Image from "next/image";
import { useState } from "react";

const HowItWorks = () => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  return (
    <section className="bg-white w-full">
      <div className="container pt-11 pb-16">
        <Title>Comment ça marche ?</Title>
        <div className="flex items-center justify-center gap-20 mt-16">
          <div>
            {howIstWorkProviderSlideData.map((slide, index) => (
              <div
                key={index}
                className="flex items-start gap-4 max-w-[570px] w-full cursor-pointer"
                onClick={() => setSelectedSlide(index)}
              >
                <span
                  className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ${
                    selectedSlide === index
                      ? "bg-primary"
                      : "bg-brand-lowest border border-primary"
                  }`}
                >
                  <h4
                    className={`text-sm font-bold ${
                      selectedSlide === index ? "text-white" : "text-primary"
                    }`}
                  >
                    {slide.number}
                  </h4>
                </span>
                <div className="mb-[30px] space-y-3 max-w-[513px] w-full">
                  <h4
                    className={`${
                      selectedSlide === index
                        ? "text-primary"
                        : "text-neutral-high"
                    } text-lg font-medium`}
                  >
                    {slide.title}
                  </h4>
                  <p className="text-neutral-high text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <Image
              src={"/iPhone-12-Pro-Max.webp"}
              alt="iphone"
              width={309}
              height={625}
              style={{ width: "auto", height: "auto" }}
            />
            <div className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] left-[50%] w-[90%] h-[96%] overflow-hidden rounded-[35px]">
              <Image
                src={howIstWorkProviderSlideData[selectedSlide].image}
                alt={howIstWorkProviderSlideData[selectedSlide].title}
                fill
                className="select-none object-contain"
              />
              <Image
                src={"/Speaker-and-camera.svg"}
                alt="speaker and camera"
                width={50}
                height={11}
                style={{ width: "auto", height: "auto" }}
                className="absolute top-[5px] -translate-x-[50%] left-[50%] z-[3] select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
