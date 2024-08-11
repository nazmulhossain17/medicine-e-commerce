import HeroSection from "@/components/Hero/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-900 text-white p-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-6xl  mb-4">
              Our only priority is to keep you healthy
            </h1>
            <p className="text-gray-300 mb-6">
              With us, expect more than just a pharmacy.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded">
                Donate now
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Learn more
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://i.ibb.co/kSTZtdK/336-3363097-pharmacy-hd-png-download-removebg-preview.png"
              alt="Volunteers helping"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
        {/* <div className="mt-8">
          <p className="text-sm text-gray-400 mb-2">Partners and backers:</p>
          <div className="flex space-x-6">
            <Image
              src="/greenpeace-logo.png"
              alt="Greenpeace"
              width={100}
              height={40}
            />
            <Image
              src="/un-logo.png"
              alt="United Nations"
              width={100}
              height={40}
            />
            <Image src="/wwf-logo.png" alt="WWF" width={100} height={40} />
            <Image src="/oxfam-logo.png" alt="Oxfam" width={100} height={40} />
          </div>
        </div> */}
      </div>
    </main>
  );
}
