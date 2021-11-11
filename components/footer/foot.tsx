import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="flex flex flex-col items-center border-b border-gray-100">
        <p className="text-sm text-green-700 font-bold py-4">
          © 2021 by TEAMDATA
        </p>
      </footer>
    </>
  );
};

export default Footer;
