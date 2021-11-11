import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-white relative pt-1 border-b-2 border-blue-700">
        <div className="container mx-auto px-6">
          <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
              <p className="text-sm text-green-700 font-bold mb-2">
                © 2021 by TEAMDATA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
