import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Header = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleClick = (route: string) => {
    router.push(route); // Navigate to the route passed as argument
  };

  return (
    <header className="!bg-black py-6 px-10 flex flex-row justify-between fixed top-0 w-full z-50">
      <div className="gap-12 space-x-12">
        <button
          className={`text-yellow-400 font-bold text-2xl custom-button`}
          onClick={() => handleClick('/')}
        >
          Kaze
        </button>
        <button
          className={`font-thin text-2xl custom-button`}
          onClick={() => handleClick('/renting')}
        >
          Renting
        </button>
        <button
          className={`font-thin text-2xl custom-button`}
          onClick={() => handleClick('/cleaning')}
        >
          Cleaning
        </button>
        <button
          className={`font-thin text-2xl custom-button`}
          onClick={() => handleClick('/repair')}
        >
          Repair
        </button>
        <button
          className={`font-thin text-2xl custom-button`}
          onClick={() => handleClick('/faq')}
        >
          FAQ
        </button>
      </div>
      <div>
        <button
          className={`font-thin text-2xl custom-button`}
          onClick={() => handleClick('/signIn')}
        >
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
