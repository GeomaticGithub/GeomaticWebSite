import Image from "next/image";

const backgroundBanner = "/mapping/overview-banner-background.jpg";
const layerstackBanner =
  "/spacialAnalysisAndDataScience/overview-banner-layerstack.png";

interface HeroSectionProps {
  hero: {
    title: string;
    subtitle: string;
  };
  intro: {
    paragraph: string;
  };
}

const HeroSection = ({ hero, intro }: HeroSectionProps) => {

  return (
    <>
      <section>
        <div className="h-[500px] xl:h-[500px] md:h-[645px] relative">
          <Image
            src={backgroundBanner}
            alt=""
            width={1440}
            height={600}
            className="w-full object-cover h-[500px] xl:h-[500px] md:h-[645px]"
          />
          <div className="max-w-[1440px] mx-auto px-6 absolute h-full inset-0 flex items-center xl:h-[500px] md:h-[645px]">
            <div className="grid lg:grid-cols-2 items-center w-full">
              <div className="text-left text-white">
                {/* ✅ use translations */}
                <h1 className="text-5xl font-bold mb-6">{hero.title}</h1>
                <div className="max-w-xl">
                  <p className="text-lg mb-8 leading-relaxed">
                    {hero.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src={layerstackBanner}
                  alt=""
                  width={400}
                  height={400}
                  className="w-80 h-80 md:size-[500px] lg:size-[700px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-[400px] text-black flex items-center justify-center">
          <div className="max-w-[1440px] mx-auto px-6">
            {/* ✅ use intro paragraph */}
            <p className="md:w-1/2">{intro.paragraph}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
