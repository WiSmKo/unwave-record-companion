import Image from "next/image";
import ButtonLead from "./ButtonLead";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">

        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
        Discover the Unwave Network
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
        Hug a friend. Share a record. Watch a band. Make memories.
        </p>
        <p className="text-lg opacity-80 leading-relaxed">
        Join us as we explore the intersection between the new world and the old, united by our joy of music.
        </p>
        <ButtonLead />

        {/* <TestimonialsAvatars priority={true} /> */}
      </div>
      <div className="lg:w-full">
        <Image
          src="/images/unwv_mascot2.png"
          // src="https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mascot"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
