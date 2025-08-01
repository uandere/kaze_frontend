import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/context";
import Image from "next/image";
import Button from "@/components/layout/Button";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTranslations } from "@/hooks/useTranslation";
// import { MenuOutlined } from "@ant-design/icons";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const handleClick = (route: string) => {
    router.push(route);
    setIsMobileMenuOpen(false);
  };

  const getButtonClass = (route: string) =>
    router.pathname === route ? "font-nunito text-xl" : "font-nunito text-xl";

  return (
    <>
      <header className="hidden md:flex py-2 px-30 justify-between items-center fixed top-0 w-full z-50 backdrop-blur-sm">
        <div className="flex items-center gap-24">
          <div onClick={() => handleClick("/")} className="cursor-pointer">
            <Image
              src="/NewLogo.svg"
              alt="Renta Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          <Button
            text={t("header.renting")}
            onClick={() => handleClick("/renting")}
            className={getButtonClass("/renting")}
          />
          <Button
            text={t("header.cleaning")}
            onClick={() => handleClick("/cleaning")}
            className={getButtonClass("/cleaning")}
          />
          <Button
            text={t("header.repair")}
            onClick={() => handleClick("/repair")}
            className={getButtonClass("/repair")}
          />
          <Button
            text={t("header.demo")}
            onClick={() => handleClick("/demo")}
            className={getButtonClass("/demo")}
          />
        </div>

        <div className="flex items-center">
          <LanguageSwitcher />
          {!user ? (
            <Button
              text="Sign In"
              onClick={() => handleClick("/signIn")}
              className={`unbounded-custom px-6 py-2 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] text-xl rounded-xl ${getButtonClass(
                "/signIn"
              )}`}
            />
          ) : (
            <a className="flex items-center gap-2" href="/signIn">
              <h1 className="font-thin text-xl">{user.displayName}</h1>
              <img src="user.svg" className="h-8 w-8 object-contain" />
            </a>
          )}
        </div>
      </header>
      <header className="flex md:hidden justify-between items-center px-6 py-4 fixed top-0 w-full z-50 backdrop-blur-sm">
        <div onClick={() => handleClick("/")} className="cursor-pointer">
          <Image
            src="/NewLogo.svg"
            alt="Renta Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          {/* <MenuOutlined style={{ fontSize: 28 }} /> */}
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-40 px-6 py-25 text-white flex flex-col gap-6 text-xl">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end text-3xl"
          >
            &times;
          </button>
          <Button
            text={t("header.renting")}
            onClick={() => handleClick("/renting")}
            className={getButtonClass("/renting")}
          />
          <Button
            text={t("header.cleaning")}
            onClick={() => handleClick("/cleaning")}
            className={getButtonClass("/cleaning")}
          />
          <Button
            text={t("header.repair")}
            onClick={() => handleClick("/repair")}
            className={getButtonClass("/repair")}
          />
          <Button
            text={t("header.demo")}
            onClick={() => handleClick("/demo")}
            className={getButtonClass("/demo")}
          />
          <LanguageSwitcher />
          {!user ? (
            <Button
              text="Sign In"
              onClick={() => handleClick("/signIn")}
              className={`unbounded-custom px-4 py-2 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] text-xl rounded-xl ${getButtonClass(
                "/signIn"
              )}`}
            />
          ) : (
            <a className="flex items-center gap-2 mt-4" href="/signIn">
              <h1 className="font-thin text-xl">{user.displayName}</h1>
              <img src="user.svg" className="h-8 w-8 object-contain" />
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
