import React from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/context";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };

  const getButtonClass = (route: string) => {
    const isActive = router.pathname === route;
    return isActive
      ? "font-thin text-2xl custom-button underline underline-offset-5"
      : "font-thin text-2xl custom-button";
  };

  return (
    <header className="!bg-black py-6 px-10 flex flex-row justify-between fixed top-0 w-full z-50">
      <div className="gap-12 space-x-12">
        <button
          className="text-[#ffd700] font-bold text-2xl custom-button"
          onClick={() => handleClick("/")}
        >
          Kaze
        </button>
        <button
          className={getButtonClass("/renting")}
          onClick={() => handleClick("/renting")}
        >
          Renting
        </button>
        <button
          className={getButtonClass("/cleaning")}
          onClick={() => handleClick("/cleaning")}
        >
          Cleaning
        </button>
        <button
          className={getButtonClass("/repair")}
          onClick={() => handleClick("/repair")}
        >
          Repair
        </button>
        <button
          className={getButtonClass("/demo")}
          onClick={() => handleClick("/demo")}
        >
          Demo
        </button>
      </div>
      <div>
        {!user ? (
          <button
            className={getButtonClass("/signIn")}
            onClick={() => handleClick("/signIn")}
          >
            Sign In
          </button>
        ) : (
          <a className="flex items-center justify-center gap-2" href="/signIn">
            <h1 className="font-thin text-2xl">{user.displayName}</h1>
            <img src="user.svg" className="h-8 w-8" />
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
