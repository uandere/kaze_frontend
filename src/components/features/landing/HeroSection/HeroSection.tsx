import React from "react";
import Button from "@/components/layout/Button";
import { useTranslations } from "@/hooks/useTranslation";

export default function HeroSection() {
  const t = useTranslations();
  return (
    <>
      <section className="relative w-screen overflow-hidden hidden md:block">
        <img
          src="/HeroBackground.svg"
          alt="Hero background"
          className="w-screen h-auto"
        />
        <div className="absolute top-0 left-0 w-full h-full px-30 text-white">
          <h1 className="unbounded-custom text-[7rem] mt-64 leading-none m-0">
            {t("greeting1")}
          </h1>
          <h1 className="unbounded-custom text-[7rem] text-right leading-none m-0">
            {t("greeting2")}
          </h1>
          <p className="font-nunito mt-24 text-2xl">
            Forget about realtor fees, constant phone
            <br /> calls and tedious paperwork. Meet
            <br /> renting done right!
          </p>
          <div className="gap-12 flex ">
            <Button
              text={t("hero.landlord")}
              className="unbounded-custom px-10 py-5 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl text-2xl mt-12"
            />
            <Button
              text={t("hero.tenant")}
              className="unbounded-custom px-10 py-5 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl text-2xl mt-12"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-30 pb-8 bg-linear-to-b to-black from-transparent">
          <h1 className="unbounded-custom text-5xl">BEST CHOICES RIGHT NOW</h1>
          <p className="font-nunito text-2xl my-16">
            Looking for something great?
          </p>
          <p className="font-nunito text-2xl">
            Here are the top apartment listings available
            <br />
            at the moment — selected based on
            <br />
            popularity, price, and overall quality
          </p>
        </div>
      </section>

      <section className="block md:hidden relative w-screen aspect-[9/16] bg-[url('/HeroBackground.svg')] bg-cover bg-center text-white">
        {/* Content with side padding */}
        <div className="absolute top-0 left-0 w-full h-full px-4 z-10">
          <h1 className="unbounded-custom text-[2.5rem] mt-32 leading-none m-0">
            {t("greeting1")}
          </h1>
          <h1 className="unbounded-custom text-[2.5rem] leading-none m-0">
            {t("greeting2")}
          </h1>
          <Button
            text={"START RENTING NOW"}
            className="unbounded-custom px-5 py-3 !bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl text-l mt-32"
          />
          <p className="font-nunito mt-24 text-m">
            Forget about realtor fees, constant phone
            <br /> calls and tedious paperwork. Meet
            <br /> renting done right!
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-b from-transparent to-black z-0"></div>
      </section>
    </>
  );
}
