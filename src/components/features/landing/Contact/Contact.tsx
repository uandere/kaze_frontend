import React from "react";
import Button from "@/components/layout/Button";

const Contact = () => {
  return (
    <div className="mx-4 md:mx-30 mt-16 md:mt-32 flex flex-col md:flex-row justify-between gap-12">
      <div className="flex-1">
        <h1 className="unbounded-custom text-4xl md:text-5xl">CONTACTS</h1>
        <p className="mt-8 md:mt-16 text-lg md:text-2xl font-thin">
          Have something to say about this apartment?
          <br />
          <br />
          Share your experience — whether good, bad, or somewhere
          in between. Your comment can help future renters make
          confident, informed decisions. We welcome honest feedback
          from real people who've been there.
        </p>

        <div className="flex justify-between md:justify-start sm:flex-row gap-8 md:gap-32 mt-12 md:mt-24">
          <div>
            <h1 className="text-xl md:text-3xl font-nunito font-bold">ADDRESS</h1>
            <p className="text-lg md:text-2xl font-nunito">myrenta.org@gmail.com</p>
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-nunito font-bold">TELEGRAM</h1>
            <p className="text-lg md:text-2xl font-nunito">@demchvk</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#2c2c2c] rounded-4xl flex flex-col items-center justify-center p-10 md:p-12">
        <h2 className="unbounded-custom text-xl md:text-3xl font-bold mb-6 md:mb-8 text-white text-center">
          LET'S KEEP IN TOUCH
        </h2>

        <div className="space-y-6 w-full max-w-md">
          <input
            type="text"
            name="name"
            placeholder="NAME"
            className="unbounded-custom w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-400 placeholder:text-left placeholder:tracking-wider placeholder:uppercase focus:border-orange-400 focus:outline-none transition-colors duration-200 text-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            className="unbounded-custom w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-400 placeholder:text-left placeholder:tracking-wider placeholder:uppercase focus:border-orange-400 focus:outline-none transition-colors duration-200 text-lg"
          />
        </div>

        <div className="pt-6">
          <Button
            text="SEND"
            className="unbounded-custom px-10 py-4 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
