"use client";

import { useRouter } from "next/router";
import Button from "../Button";

const LanguageSwitcher = () => {
  const { locale, locales, pathname, query, asPath, push } = useRouter();

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      push({ pathname, query }, asPath, { locale: newLocale });
    }
  };

  function handleClick(path: string): void {
    push(path);
  }
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {locales?.map((loc) => (
        <Button
          text={
            loc === "ua"
              ? "Укр"
              : loc === "en"
              ? "Eng"
              : loc.toUpperCase()
          }
          key={loc}
          onClick={() => changeLanguage(loc)}
          className="font-nunito text-2xl mr-6"
        />
      ))}
    </div>
  );
};

export default LanguageSwitcher;
