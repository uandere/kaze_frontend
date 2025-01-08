import React from "react";``
import Header from "../components/header/header";
import PropertyCard from "../components/estateCard/estateCard";

const RentingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mt-20">
        <section className="flex flex-col md:flex-row max-w-full overflow-x-hidden mb-8 ml-20 border-t-[5px] border-l-[5px] border-b-[5px] border-[#ffd700] rounded-tl-lg rounded-bl-lg ">
          <div className="h-full rounded overflow-hidden">
            <img src="/estate1.avif" alt="Apartment" className="rounded" />
          </div>
          <div className="rounded space-y-4 p-6">
            <h2 className="text-4xl font-bold text-[#ffd700]">
              25 000 ₴/month
            </h2>
            <p className="font-thin text-2xl">Pymonenka Mykoly, 25a</p>
            <div className="flex flex-row gap-4 text-lg font-thin">
              <p className="rounded border p-1">First-time rental</p>
              <p className="rounded border p-1">RC Auroom City</p>
              <p className="rounded border p-1">Pet-friendly</p>
              <p className="rounded border p-1">Children-friendly</p>
            </div>
            <div className="flex flex-row gap-6 ">
              <div className="flex flex-row gap-2 items-center">
                <img src="/bad.svg" alt="Apartment" width={27} height={27} />
                <p className="font-thin">1 room</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <img src="/stairs.svg" alt="Apartment" width={27} height={27} />
                <p className="font-thin">5th floor</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <img src="/size.svg" alt="Apartment" width={27} height={27} />
                <p className="font-thin">42 m^2</p>
              </div>
            </div>
            <div className="border border-[#ffd700] rounded-xl p-4">
              <div className="flex space-x-4 items-center">
                <img
                  src="/avatar.png"
                  alt="User Avatar"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">Сергій</p>
                  <div className="flex flex-row gap-2">
                    <img
                      src="/approve.svg"
                      alt="User Avatar"
                      width={15}
                      height={15}
                      className="rounded-full"
                    />
                    <p className="font-thin">2 successful rentals before</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white w-52 py-2 rounded text-black flex flex-row gap-2 justify-center">
                <img
                  src="/message.svg"
                  alt="User Avatar"
                  width={15}
                  height={15}
                  className="rounded-full"
                />{" "}
                Chat
              </button>
              <button className="bg-white w-52 py-2 rounded text-black flex flex-row gap-2 justify-center">
                <img
                  src="/calendar.svg"
                  alt="User Avatar"
                  width={15}
                  height={15}
                  className="rounded-full"
                />{" "}
                Book a review
              </button>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className=" flex flex-row p-20">
          <div className="w-1/2">
            <h3 className="text-3xl font-bold flex justify-center">
              Description
            </h3>
            <p className="font-thin text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
            <h3 className="text-3xl font-bold flex justify-center">Details</h3>
            <div className="grid grid-cols-3 gap-4 mt-8 font-bold">
              <div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/dishwasher.svg"
                    alt="User Avatar"
                    width={30}
                    height={30}
                  />
                  <p>dishwasher machine</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/washer.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>washer machinee</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/microwave.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>microwave</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/gas_stove.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>gas stove</p>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/wifi.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>Wi-Fi</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img src="/tv.svg" alt="User Avatar" width={30} height={15} />
                  <p>TV</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/refrigerator.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>refrigerator</p>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/oven.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>oven</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/filtered_water.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>filtered water</p>
                </div>
                <div className="flex flex-row gap-2 mb-6 items-center">
                  <img
                    src="/gas_heating.svg"
                    alt="User Avatar"
                    width={30}
                    height={15}
                  />
                  <p>gas heating</p>
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold flex justify-center">
              Amenities
            </h3>
            <div className="flex flex-row gap-4 mb-6 items-center mt-8 font-bold">
              <img
                src="/parking.svg"
                alt="User Avatar"
                width={30}
                height={15}
              />
              <div className="flex flex-row gap-2">
                <p>Parking lot: </p>
                <p className="text-green-500">available</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 mb-6 items-center font-bold">
              <img src="/shops.svg" alt="User Avatar" width={30} height={15} />
              <p className="text-[#ffd700] underline">
                See closest shops on the map
              </p>
            </div>
            <div className="flex flex-row gap-4 mb-6 items-center font-bold">
              <img
                src="/restaurants.svg"
                alt="User Avatar"
                width={30}
                height={15}
              />
              <p className="text-[#ffd700] underline">
                See closest restaraunts on the map
              </p>
            </div>
          </div>
          <div className="w-1/2 px-20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.113429900473!2d24.02519045157188!3d49.81683494978086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae7f32e64a0af%3A0xf03f310b5c573ded!2sUCU%20-%20Collegium%20Y.%20Slipoho!5e0!3m2!1sen!2sua!4v1735382084163!5m2!1sen!2sua"
              width="600"
              height="700"
              style={{ border: 0, borderRadius: "20px" }}
              loading="lazy"
            ></iframe>
          </div>
        </section>
        <div>
          <div className="flex flex-row mb-6 items-center font-bold">
            <img
              src="/heart_eyed_emoji.svg"
              alt="User Avatar"
              width={240}
              height={15}
            />
            <div className="flex flex-row gap-1 text-3xl ml-10">
              <div>Liked the post?</div>
              <div className="text-[#ffd700] underline">chat</div>
              <div>with the owner or</div>
              <div className="text-[#ffd700] underline">book a review </div>
              <div>right away.</div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="flex justify-center text-4xl font-bold">
            More posts like this...
          </h1>
        </div>
        <div className="flex gap-8 flex-row my-8 mx-10">
          <PropertyCard />
          <PropertyCard />
        </div>
      </main>
    </div>
  );
};

export default RentingPage;
