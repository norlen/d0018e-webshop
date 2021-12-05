import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";

import HeroImage from "../assets/photo-1611843467160-25afb8df1074.png";
import HeroImage2 from "../assets/photo-1461354464878-ad92f492a5a0.png";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sebbes ekologiska - Om oss</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white min-h-full mb-24">
        <Image
          src={HeroImage}
          alt="Beautiful gardening"
          className="object-cover"
          height={424}
          aria-hidden={true}
        />
        <div className="max-w-xl mx-auto flex flex-col gap-4 py-8">
          <h2 className="font-medium text-3xl text-center text-green-500">
            Vårt uppdrag
          </h2>
          <p>
            Vår bakgrund har lett oss in i den ekologiska och lokalproducerade
            matindustrin. Vi vill inte se våra grönsaker skeppas från andra
            sidan jorden när det finns likvärda produkter inom kommunen. Vi vill
            skapa en hubb där alla människor i världen har tillgång billig,
            ekologisk, lokalproducerad samt icke-GMO mat.
          </p>
          <p>
            Detta är vårt <span className="italic">kall</span>, vårt{" "}
            <span className="italic">mål</span>, vår{" "}
            <span className="font-bold">livsstil!</span>
          </p>
        </div>
        <Image
          src={HeroImage2}
          alt="Beautiful gardening"
          className="object-cover"
          height={424}
          aria-hidden={true}
        />
        <div className="max-w-xl mx-auto flex flex-col gap-4 py-8">
          <h2 className="font-medium text-3xl text-center text-green-500">
            Vem är vi?
          </h2>
          <p>
            Vi är tre individer som är väldigt eko-vänliga och älskar naturen
            och fred. På fritiden gillar att vi att laga mat utomhus i skogen,
            meditera samt demonstrera mot multinationella företag som förstör
            vår vackra natur.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;