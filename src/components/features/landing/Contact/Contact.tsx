import React from "react";
import Button from "@/components/layout/Button";
const Contact = () => {
  return (
    <div className="p-16 flex-row flex">
      <div className="w-1/2">
        <h1 className="unbounded-custom text-5xl">CONTACTS</h1>
        <p className="mt-16 text-2xl font-thin">
          Have something to say about this apartment?
          <br />
          <br />
          Share your experience — whether good, bad, or somewhere
          <br />
          in between. Your comment can help future renters make
          <br />
          confident, informed decisions. We welcome honest feedback
          <br />
          from real people who've been there.
        </p>
        <div className="flex-row flex gap-32 mt-16">
          <div>
            <h1 className="text-3xl">ADRESS</h1>
            <p className="font-thin text-2xl">myrenta.org@gmail.com</p>
          </div>
          <div>
            <h1 className="text-3xl">TELEGRAM</h1>
            <p className="font-thin text-2xl">@demchvk</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#4a4a4a] rounded-4xl flex flex-col items-center justify-center p-28">
        <h2 className="text-3xl font-bold mb-8 text-white">
          LET'S KEEP IN TOUCH
        </h2>

        <div className="space-y-6">
          <div className="w-100">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              className="w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-400 placeholder:text-left placeholder:tracking-wider placeholder:uppercase focus:border-orange-400 focus:outline-none transition-colors duration-200 text-lg"
            />
          </div>

          <div className="w-full mt-6">
            <input
              type="text"
              name="name"
              placeholder="EMAIL"
              className="w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-400 placeholder:text-left placeholder:tracking-wider placeholder:uppercase focus:border-orange-400 focus:outline-none transition-colors duration-200 text-lg"
            />
          </div>
        </div>
        <div className="pt-6">
            <Button
              text="SEND"
              className="unbounded-custom px-15 py-5 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl"
            />
          </div>
      </div>
    </div>
  );
};

export default Contact;
