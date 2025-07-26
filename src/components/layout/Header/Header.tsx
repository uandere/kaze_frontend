import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/layout/Button";
import {useAuthenticator} from "@aws-amplify/ui-react";

const Header = () => {
  const { authStatus, user, signOut } = useAuthenticator();
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };

  const getButtonClass = (route: string) => {
    const isActive = router.pathname === route;
    return isActive
      ? "font-nunito text-3xl"
      : "font-nunito text-3xl";
  };

  return (
    <header className="py-6 px-16 flex flex-row justify-between items-center fixed top-0 w-full z-50">
      <div className="flex items-center gap-16">
        <div onClick={() => handleClick("/")} className="cursor-pointer">
          <Image
            src="/NewLogo.svg"
            alt="Kaze Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <Button
          text="Renting"
          onClick={() => handleClick("/renting")}
          className={getButtonClass("/renting")}
        />
        <Button
          text="Cleaning"
          onClick={() => handleClick("/cleaning")}
          className={getButtonClass("/cleaning")}
        />
        <Button
          text="Repair"
          onClick={() => handleClick("/repair")}
          className={getButtonClass("/repair")}
        />
        <Button
          text="Demo"
          onClick={() => handleClick("/demo")}
          className={getButtonClass("/demo")}
        />
      </div>

      <div className="flex items-center">
        {!user ? (
          <Button
            text="Sign In"
            onClick={() => handleClick("/signIn")}
            className={`unbounded-custom px-15 py-5 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl ${getButtonClass("/signIn")}`}
          />
        ) : (
          <a className="flex items-center gap-2" href="/signIn">
            <h1 className="font-thin text-2xl">{user.username}</h1>
            <img src="user.svg" className="h-8 w-8 object-contain" />
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
